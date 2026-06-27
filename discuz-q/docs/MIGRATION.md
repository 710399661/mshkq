# 数据迁移指南

> 从旧版 Discuz! Q (v2.x/v3.x) 迁移到新版 Discuz! Q (Next.js + Laravel)

## 目录

- [迁移前准备](#迁移前准备)
- [迁移步骤](#迁移步骤)
- [迁移内容说明](#迁移内容说明)
- [回滚方案](#回滚方案)
- [常见问题](#常见问题)

---

## 迁移前准备

### 1. 环境要求

| 项目 | 要求 |
|------|------|
| PHP | >= 8.2 |
| MySQL | >= 5.7 (推荐 8.0+) |
| 旧数据库 | Discuz! Q v2.x / v3.x |
| 磁盘空间 | 旧数据库大小的 2 倍以上 |

### 2. 备份旧数据库

```bash
# 导出旧数据库
mysqldump -u root -p old_discuzq > backup_old_discuzq_$(date +%Y%m%d).sql

# 验证备份
ls -lh backup_old_discuzq_*.sql
```

### 3. 配置新数据库

```bash
# 创建新数据库
mysql -u root -p -e "CREATE DATABASE new_discuzq CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;"
```

### 4. 配置环境变量

在 `apps/api/.env` 中添加旧数据库连接配置：

```env
# 旧数据库配置
OLD_DB_CONNECTION=mysql
OLD_DB_HOST=127.0.0.1
OLD_DB_PORT=3306
OLD_DB_DATABASE=old_discuzq
OLD_DB_USERNAME=root
OLD_DB_PASSWORD=your_password
OLD_DB_CHARSET=utf8mb4
OLD_DB_COLLATION=utf8mb4_unicode_ci
OLD_DB_PREFIX=
```

### 5. 运行新数据库迁移

```bash
cd apps/api

# 执行新数据库表结构迁移
php artisan migrate

# （可选）创建默认管理员账号
php artisan db:seed --class=UserSeeder
```

---

## 迁移步骤

### 第一步：试运行（强烈推荐）

先用 `--dry-run` 和 `--limit` 测试迁移是否正常：

```bash
cd apps/api

# 试运行，每表只迁移前 100 条，不写入数据
php artisan migrate:from-discuz-q --dry-run --limit=100
```

检查输出：
- 旧数据库连接是否成功
- 各表记录数是否正确
- 有无报错信息

### 第二步：完整迁移

确认无误后，执行完整迁移：

```bash
# 完整迁移
php artisan migrate:from-discuz-q
```

迁移过程中会显示实时进度：
```
========================================
  Discuz! Q 数据迁移工具
========================================
✓ 旧数据库连接成功

【1/6】迁移用户数据...
  总记录数: 12580
  进度: 12580/12580 (100%)
  ✓ 成功: 12578, 失败: 2

【2/6】迁移分类数据...
...
```

### 第三步：验证迁移结果

迁移完成后，检查各表数据：

```sql
-- 检查用户数
SELECT COUNT(*) FROM users;

-- 检查帖子数
SELECT COUNT(*) FROM threads;

-- 检查评论数
SELECT COUNT(*) FROM posts;

-- 检查分类数
SELECT COUNT(*) FROM categories;

-- 检查标签数
SELECT COUNT(*) FROM tags;

-- 检查关注关系数
SELECT COUNT(*) FROM user_follows;
```

对比旧数据库：
```sql
-- 旧库用户数
SELECT COUNT(*) FROM old_discuzq.users;
```

### 第四步：重建索引和统计信息

```bash
# 优化表
mysqlcheck -u root -p --optimize new_discuzq

# 分析表（更新统计信息）
mysqlcheck -u root -p --analyze new_discuzq
```

---

## 迁移内容说明

### 迁移的表和字段映射

#### 1. 用户表 (users)

| 旧字段 | 新字段 | 说明 |
|--------|--------|------|
| id | id | 用户ID |
| username | username | 用户名 |
| username | name | 昵称（默认同用户名） |
| - | email | 邮箱（旧版无邮箱，生成占位） |
| password | password | 密码（直接迁移，Laravel 兼容 bcrypt） |
| mobile | mobile | 手机号 |
| mobile_confirmed | mobile_verified_at | 手机号验证时间 |
| avatar | avatar | 头像 |
| status | status | 用户状态 |
| thread_count | thread_count | 发帖数 |
| follow_count | follow_count | 关注数 |
| fans_count | fans_count | 粉丝数 |
| last_login_ip | last_login_ip | 最后登录IP |
| register_ip | register_ip | 注册IP |
| login_at | last_login_at | 最后登录时间 |
| created_at | created_at | 创建时间 |
| updated_at | updated_at | 更新时间 |

#### 2. 分类表 (categories)

| 旧字段 | 新字段 | 说明 |
|--------|--------|------|
| id | id | 分类ID |
| name | name | 分类名称 |
| description | description | 分类描述 |
| icon | icon | 分类图标 |
| sort | sort | 排序 |
| thread_count | thread_count | 帖子数 |
| created_at | created_at | 创建时间 |
| updated_at | updated_at | 更新时间 |

#### 3. 标签表 (tags)

| 旧字段 | 新字段 | 说明 |
|--------|--------|------|
| id | id | 标签ID |
| name | name | 标签名称 |
| description | description | 标签描述 |
| thread_count | thread_count | 使用次数 |
| created_at | created_at | 创建时间 |
| updated_at | updated_at | 更新时间 |

#### 4. 帖子表 (threads)

| 旧字段 | 新字段 | 说明 |
|--------|--------|------|
| id | id | 帖子ID |
| user_id | user_id | 作者ID |
| category_id | category_id | 分类ID |
| title | title | 标题 |
| content | content | 内容（Markdown/HTML） |
| is_sticky | is_sticky | 是否置顶 |
| is_essence | is_essence | 是否精华 |
| view_count | view_count | 浏览量 |
| reply_count | reply_count | 回复数 |
| like_count | like_count | 点赞数 |
| favorite_count | favorite_count | 收藏数 |
| share_count | share_count | 分享数 |
| price | price | 售价（付费帖） |
| free_words | free_words | 免费字数 |
| status | status | 状态（0正常 1审核中 2已删除） |
| created_at | created_at | 创建时间 |
| updated_at | updated_at | 更新时间 |
| deleted_at | deleted_at | 删除时间 |

#### 5. 评论表 (posts)

| 旧字段 | 新字段 | 说明 |
|--------|--------|------|
| id | id | 评论ID |
| thread_id | thread_id | 帖子ID |
| user_id | user_id | 用户ID |
| reply_id | reply_id | 回复的评论ID |
| reply_user_id | reply_user_id | 回复的用户ID |
| content | content | 评论内容 |
| like_count | like_count | 点赞数 |
| floor | floor | 楼层 |
| status | status | 状态 |
| created_at | created_at | 创建时间 |
| updated_at | updated_at | 更新时间 |
| deleted_at | deleted_at | 删除时间 |

#### 6. 用户关注表 (user_follows)

| 旧字段 | 新字段 | 说明 |
|--------|--------|------|
| from_user_id | from_user_id | 关注者ID |
| to_user_id | to_user_id | 被关注者ID |
| created_at | created_at | 关注时间 |

### 暂未迁移的内容

以下内容暂未自动迁移，需手动处理或后续版本支持：

- ⚠️ 私信/对话记录
- ⚠️ 附件/图片资源（需要迁移存储）
- ⚠️ 举报记录
- ⚠️ 钱包/充值/打赏记录
- ⚠️ 站点配置
- ⚠️ 管理操作日志
- ⚠️ 表情/表情收藏
- ⚠️ 用户组/权限组

---

## 回滚方案

### 方案一：数据库回滚（推荐）

迁移前已备份旧数据库，直接恢复：

```bash
# 1. 删除新数据库
mysql -u root -p -e "DROP DATABASE new_discuzq;"

# 2. 重新创建
mysql -u root -p -e "CREATE DATABASE new_discuzq CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;"

# 3. 重新运行迁移
cd apps/api
php artisan migrate

# 4. （如果需要）重新数据迁移
php artisan migrate:from-discuz-q
```

### 方案二：部分回滚

如果只迁移了部分表，可以手动清理：

```sql
-- 清理迁移数据（按依赖顺序）
SET FOREIGN_KEY_CHECKS = 0;

TRUNCATE TABLE post_likes;
TRUNCATE TABLE thread_likes;
TRUNCATE TABLE thread_favorites;
TRUNCATE TABLE user_follows;
TRUNCATE TABLE posts;
TRUNCATE TABLE thread_tags;
TRUNCATE TABLE threads;
TRUNCATE TABLE tags;
TRUNCATE TABLE categories;
TRUNCATE TABLE users;

SET FOREIGN_KEY_CHECKS = 1;
```

### 方案三：使用迁移批次标记

迁移脚本支持重入，失败后修复问题可以重新运行：

```bash
# 重新运行（upsert 模式，已存在的会更新）
php artisan migrate:from-discuz-q
```

> 注意：迁移使用 `upsert` 方式，重复运行不会导致数据重复，会按 ID 更新。

---

## 常见问题

### Q1: 迁移时提示 "Unknown column 'xxx' in 'field list'"

旧版本 Discuz! Q 表结构可能有差异。解决方法：
1. 检查旧数据库表结构
2. 修改 `MigrateFromDiscuzQ.php` 中对应的字段映射
3. 重新运行迁移

### Q2: 密码迁移后登录失败

Discuz! Q 旧版使用 bcrypt 哈希，Laravel 默认也是 bcrypt，应该可以直接兼容。
如果登录失败，检查：
- 旧密码哈希格式是否正确
- 是否有自定义加盐逻辑
- 可以考虑让用户重置密码

### Q3: 迁移速度太慢怎么办

- 加大 `chunkSize`（默认 1000，可调到 5000）
- 关闭外键检查（脚本已自动处理）
- 使用 MySQL 批量插入优化
- 迁移期间暂停写入旧数据库

### Q4: 迁移后图片/附件打不开

旧版附件存储在服务器或云存储，需要单独迁移：
1. 迁移附件文件到新的存储位置
2. 更新数据库中的附件路径
3. 配置新的文件存储驱动（local/s3/oss等）

### Q5: 可以在不停止旧站的情况下迁移吗？

可以，分阶段迁移：
1. **第一阶段**：全量迁移历史数据
2. **第二阶段**：迁移增量数据（迁移期间新增的内容）
3. **第三阶段**：切换 DNS，正式上线

增量迁移可以通过记录迁移截止 ID，然后只迁移大于该 ID 的记录。

---

## 技术支持

如遇迁移问题，请检查：
- `storage/logs/laravel.log` — 详细错误日志
- 迁移命令输出 — 失败条数和原因
- 数据库慢查询日志 — 性能问题

