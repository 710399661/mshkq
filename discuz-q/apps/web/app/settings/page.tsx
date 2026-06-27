'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import {
  User,
  Shield,
  Bell,
  Lock,
  Camera,
  Mail,
  Smartphone,
  Globe,
  Moon,
  Sun,
  Monitor,
  Eye,
  Users,
  UserCheck,
  UserX,
  Save,
  RotateCcw,
  Check,
  Plus,
} from 'lucide-react';
import { Avatar, AvatarImage, AvatarFallback } from '@discuzq/ui/avatar';
import { Button } from '@discuzq/ui/button';
import { Input } from '@discuzq/ui/input';
import { Textarea } from '@discuzq/ui/textarea';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@discuzq/ui/card';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@discuzq/ui/tabs';
import { toast } from '@discuzq/ui/toast';
import { useAuthStore } from '@/store/auth';
import { useUser } from '@/hooks/useAuth';

interface SettingsData {
  profile: {
    username: string;
    nickname: string;
    bio: string;
    gender: 'male' | 'female' | 'secret';
    location: string;
    avatar: string;
  };
  security: {
    email: string;
    mobile: string;
    thirdParty: {
      wechat: boolean;
      qq: boolean;
      weibo: boolean;
    };
  };
  preferences: {
    notifications: {
      reply: boolean;
      like: boolean;
      follow: boolean;
      system: boolean;
      email: boolean;
    };
    theme: 'light' | 'dark' | 'system';
    language: 'zh-CN';
  };
  privacy: {
    postVisibility: 'everyone' | 'followers' | 'only_me';
    followPermission: 'everyone' | 'no_one';
    onlineStatus: 'everyone' | 'followers' | 'no_one';
    blacklist: Array<{ id: number; username: string; avatar: string }>;
  };
}

const defaultSettings: SettingsData = {
  profile: {
    username: '',
    nickname: '',
    bio: '',
    gender: 'secret',
    location: '',
    avatar: '',
  },
  security: {
    email: '',
    mobile: '',
    thirdParty: {
      wechat: false,
      qq: false,
      weibo: false,
    },
  },
  preferences: {
    notifications: {
      reply: true,
      like: true,
      follow: true,
      system: true,
      email: false,
    },
    theme: 'system',
    language: 'zh-CN',
  },
  privacy: {
    postVisibility: 'everyone',
    followPermission: 'everyone',
    onlineStatus: 'everyone',
    blacklist: [
      { id: 1, username: '用户A', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=userA' },
      { id: 2, username: '用户B', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=userB' },
    ],
  },
};

function Switch({
  checked,
  onCheckedChange,
  disabled,
}: {
  checked: boolean;
  onCheckedChange: (checked: boolean) => void;
  disabled?: boolean;
}) {
  return (
    <button
      type="button"
      role="switch"
      aria-checked={checked}
      disabled={disabled}
      onClick={() => onCheckedChange(!checked)}
      className={`relative inline-flex h-6 w-11 shrink-0 cursor-pointer items-center rounded-full border-2 border-transparent transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:cursor-not-allowed disabled:opacity-50 ${
        checked ? 'bg-primary' : 'bg-input'
      }`}
    >
      <span
        className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-background shadow-lg ring-0 transition-transform ${
          checked ? 'translate-x-5' : 'translate-x-0'
        }`}
      />
    </button>
  );
}

function RadioGroup({
  value,
  onChange,
  options,
}: {
  value: string;
  onChange: (value: string) => void;
  options: Array<{ value: string; label: string; description?: string }>;
}) {
  return (
    <div className="space-y-2">
      {options.map((option) => (
        <label
          key={option.value}
          className={`flex cursor-pointer items-start gap-3 rounded-lg border p-3 transition-colors ${
            value === option.value
              ? 'border-primary bg-primary/5'
              : 'hover:bg-muted/50'
          }`}
        >
          <input
            type="radio"
            name="radio-group"
            value={option.value}
            checked={value === option.value}
            onChange={(e) => onChange(e.target.value)}
            className="mt-1 h-4 w-4 text-primary focus:ring-primary"
          />
          <div>
            <div className="font-medium">{option.label}</div>
            {option.description && (
              <div className="text-sm text-muted-foreground">{option.description}</div>
            )}
          </div>
        </label>
      ))}
    </div>
  );
}

const sidebarItems = [
  { value: 'profile', label: '个人资料', icon: User },
  { value: 'security', label: '账号安全', icon: Shield },
  { value: 'preferences', label: '偏好设置', icon: Bell },
  { value: 'privacy', label: '隐私设置', icon: Lock },
];

export default function SettingsPage() {
  const router = useRouter();
  const queryClient = useQueryClient();
  const { userInfo } = useAuthStore();
  const { data: user } = useUser();
  const [activeTab, setActiveTab] = useState('profile');
  const [settings, setSettings] = useState<SettingsData>(defaultSettings);
  const [passwordForm, setPasswordForm] = useState({
    oldPassword: '',
    newPassword: '',
    confirmPassword: '',
  });

  useEffect(() => {
    if (user) {
      setSettings((prev) => ({
        ...prev,
        profile: {
          username: user.username || '',
          nickname: (user.nickname as string) || user.username || '',
          bio: (user.bio as string) || '',
          gender:
            user.gender === 1 ? 'male' : user.gender === 2 ? 'female' : 'secret',
          location: (user.location as string) || '',
          avatar: user.avatar || '',
        },
        security: {
          ...prev.security,
          email: (user.email as string) || '',
          mobile: (user.mobile as string) || '',
        },
      }));
    }
  }, [user]);

  const saveMutation = useMutation({
    mutationFn: async (data: SettingsData) => {
      await new Promise((resolve) => setTimeout(resolve, 800));
      return data;
    },
    onSuccess: (data) => {
      toast({ title: '保存成功', description: '你的设置已更新' });
      queryClient.invalidateQueries({ queryKey: ['user'] });
    },
  });

  const passwordMutation = useMutation({
    mutationFn: async () => {
      await new Promise((resolve) => setTimeout(resolve, 800));
      return true;
    },
    onSuccess: () => {
      toast({ title: '密码修改成功' });
      setPasswordForm({ oldPassword: '', newPassword: '', confirmPassword: '' });
    },
  });

  const handleSave = () => {
    if (passwordForm.newPassword || passwordForm.oldPassword) {
      if (!passwordForm.oldPassword) {
        toast({ title: '请输入旧密码', variant: 'destructive' });
        return;
      }
      if (passwordForm.newPassword !== passwordForm.confirmPassword) {
        toast({ title: '两次输入的新密码不一致', variant: 'destructive' });
        return;
      }
      if (passwordForm.newPassword.length < 6) {
        toast({ title: '新密码至少6位', variant: 'destructive' });
        return;
      }
      passwordMutation.mutate();
    }
    saveMutation.mutate(settings);
  };

  const handleReset = () => {
    if (user) {
      setSettings((prev) => ({
        ...prev,
        profile: {
          username: user.username || '',
          nickname: (user.nickname as string) || user.username || '',
          bio: (user.bio as string) || '',
          gender:
            user.gender === 1 ? 'male' : user.gender === 2 ? 'female' : 'secret',
          location: (user.location as string) || '',
          avatar: user.avatar || '',
        },
      }));
    }
    setPasswordForm({ oldPassword: '', newPassword: '', confirmPassword: '' });
    toast({ title: '已重置' });
  };

  const updateProfile = (field: string, value: any) => {
    setSettings((prev) => ({
      ...prev,
      profile: { ...prev.profile, [field]: value },
    }));
  };

  const updateNotification = (key: string, value: boolean) => {
    setSettings((prev) => ({
      ...prev,
      preferences: {
        ...prev.preferences,
        notifications: { ...prev.preferences.notifications, [key]: value },
      },
    }));
  };

  const updatePrivacy = (key: string, value: any) => {
    setSettings((prev) => ({
      ...prev,
      privacy: { ...prev.privacy, [key]: value },
    }));
  };

  const removeFromBlacklist = (id: number) => {
    setSettings((prev) => ({
      ...prev,
      privacy: {
        ...prev.privacy,
        blacklist: prev.privacy.blacklist.filter((u) => u.id !== id),
      },
    }));
    toast({ title: '已移除黑名单' });
  };

  const handleAvatarClick = () => {
    toast({ title: '头像上传功能开发中' });
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">设置</h1>
        <p className="mt-1 text-sm text-muted-foreground">管理你的账户设置和偏好</p>
      </div>

      <div className="flex flex-col gap-6 md:flex-row">
        <div className="w-full md:w-48 md:shrink-0">
          <Card className="p-2">
            <nav className="flex md:flex-col gap-1 overflow-x-auto">
              {sidebarItems.map((item) => (
                <button
                  key={item.value}
                  onClick={() => setActiveTab(item.value)}
                  className={`flex w-full items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors whitespace-nowrap ${
                    activeTab === item.value
                      ? 'bg-primary/10 text-primary'
                      : 'text-muted-foreground hover:bg-muted hover:text-foreground'
                  }`}
                >
                  <item.icon className="h-4 w-4" />
                  {item.label}
                </button>
              ))}
            </nav>
          </Card>
        </div>

        <div className="flex-1 space-y-6">
          {activeTab === 'profile' && (
            <Card>
              <CardHeader>
                <CardTitle>个人资料</CardTitle>
                <CardDescription>修改你的个人信息和头像</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex items-center gap-6">
                  <div className="relative">
                    <Avatar className="h-20 w-20">
                      <AvatarImage
                        src={settings.profile.avatar}
                        alt={settings.profile.username}
                      />
                      <AvatarFallback className="text-2xl">
                        {settings.profile.username?.[0] || 'U'}
                      </AvatarFallback>
                    </Avatar>
                    <button
                      onClick={handleAvatarClick}
                      className="absolute -bottom-1 -right-1 flex h-7 w-7 items-center justify-center rounded-full bg-primary text-primary-foreground shadow-lg hover:bg-primary/90"
                    >
                      <Camera className="h-3.5 w-3.5" />
                    </button>
                  </div>
                  <div>
                    <h3 className="font-medium">更换头像</h3>
                    <p className="text-sm text-muted-foreground">
                      支持 JPG、PNG 格式，大小不超过 2MB
                    </p>
                  </div>
                </div>

                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="space-y-2">
                    <label className="text-sm font-medium">用户名</label>
                    <Input
                      value={settings.profile.username}
                      onChange={(e) => updateProfile('username', e.target.value)}
                      placeholder="请输入用户名"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium">昵称</label>
                    <Input
                      value={settings.profile.nickname}
                      onChange={(e) => updateProfile('nickname', e.target.value)}
                      placeholder="请输入昵称"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium">个人简介</label>
                  <Textarea
                    value={settings.profile.bio}
                    onChange={(e) => updateProfile('bio', e.target.value)}
                    placeholder="介绍一下你自己吧..."
                    rows={4}
                  />
                </div>

                <div className="space-y-3">
                  <label className="text-sm font-medium">性别</label>
                  <div className="flex gap-4">
                    {[
                      { value: 'male', label: '男' },
                      { value: 'female', label: '女' },
                      { value: 'secret', label: '保密' },
                    ].map((option) => (
                      <label
                        key={option.value}
                        className="flex cursor-pointer items-center gap-2"
                      >
                        <input
                          type="radio"
                          name="gender"
                          value={option.value}
                          checked={settings.profile.gender === option.value}
                          onChange={(e) => updateProfile('gender', e.target.value)}
                          className="h-4 w-4 text-primary focus:ring-primary"
                        />
                        <span className="text-sm">{option.label}</span>
                      </label>
                    ))}
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium">所在地</label>
                  <Input
                    value={settings.profile.location}
                    onChange={(e) => updateProfile('location', e.target.value)}
                    placeholder="请输入所在地"
                  />
                </div>
              </CardContent>
            </Card>
          )}

          {activeTab === 'security' && (
            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>账号信息</CardTitle>
                  <CardDescription>你的基本账号信息</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between rounded-lg border p-4">
                    <div className="flex items-center gap-3">
                      <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10">
                        <Mail className="h-5 w-5 text-primary" />
                      </div>
                      <div>
                        <div className="font-medium">邮箱</div>
                        <div className="text-sm text-muted-foreground">
                          {settings.security.email || '未绑定邮箱'}
                        </div>
                      </div>
                    </div>
                    <Button variant="outline" size="sm">
                      修改
                    </Button>
                  </div>

                  <div className="flex items-center justify-between rounded-lg border p-4">
                    <div className="flex items-center gap-3">
                      <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10">
                        <Smartphone className="h-5 w-5 text-primary" />
                      </div>
                      <div>
                        <div className="font-medium">手机号</div>
                        <div className="text-sm text-muted-foreground">
                          {settings.security.mobile || '未绑定手机号'}
                        </div>
                      </div>
                    </div>
                    <Button variant="outline" size="sm">
                      {settings.security.mobile ? '修改' : '绑定'}
                    </Button>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>修改密码</CardTitle>
                  <CardDescription>定期修改密码可以保护账号安全</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <label className="text-sm font-medium">旧密码</label>
                    <Input
                      type="password"
                      value={passwordForm.oldPassword}
                      onChange={(e) =>
                        setPasswordForm((prev) => ({ ...prev, oldPassword: e.target.value }))
                      }
                      placeholder="请输入旧密码"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium">新密码</label>
                    <Input
                      type="password"
                      value={passwordForm.newPassword}
                      onChange={(e) =>
                        setPasswordForm((prev) => ({ ...prev, newPassword: e.target.value }))
                      }
                      placeholder="请输入新密码"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium">确认新密码</label>
                    <Input
                      type="password"
                      value={passwordForm.confirmPassword}
                      onChange={(e) =>
                        setPasswordForm((prev) => ({ ...prev, confirmPassword: e.target.value }))
                      }
                      placeholder="请再次输入新密码"
                    />
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>第三方账号绑定</CardTitle>
                  <CardDescription>绑定第三方账号，方便快捷登录</CardDescription>
                </CardHeader>
                <CardContent className="space-y-3">
                  {[
                    { key: 'wechat', name: '微信', color: 'text-green-500' },
                    { key: 'qq', name: 'QQ', color: 'text-blue-500' },
                    { key: 'weibo', name: '微博', color: 'text-red-500' },
                  ].map((item) => (
                    <div
                      key={item.key}
                      className="flex items-center justify-between rounded-lg border p-4"
                    >
                      <div className="flex items-center gap-3">
                        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-muted">
                          <Globe className={`h-5 w-5 ${item.color}`} />
                        </div>
                        <div>
                          <div className="font-medium">{item.name}</div>
                          <div className="text-sm text-muted-foreground">
                            {settings.security.thirdParty[item.key as keyof typeof settings.security.thirdParty]
                              ? '已绑定'
                              : '未绑定'}
                          </div>
                        </div>
                      </div>
                      <Button
                        variant={
                          settings.security.thirdParty[
                            item.key as keyof typeof settings.security.thirdParty
                          ]
                            ? 'outline'
                            : 'default'
                        }
                        size="sm"
                        onClick={() =>
                          setSettings((prev) => ({
                            ...prev,
                            security: {
                              ...prev.security,
                              thirdParty: {
                                ...prev.security.thirdParty,
                                [item.key]:
                                  !prev.security.thirdParty[
                                    item.key as keyof typeof prev.security.thirdParty
                                  ],
                              },
                            },
                          }))
                        }
                      >
                        {settings.security.thirdParty[item.key as keyof typeof settings.security.thirdParty]
                          ? '解绑'
                          : '绑定'}
                      </Button>
                    </div>
                  ))}
                </CardContent>
              </Card>
            </div>
          )}

          {activeTab === 'preferences' && (
            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>通知设置</CardTitle>
                  <CardDescription>选择你想要接收的通知类型</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  {[
                    { key: 'reply', label: '有人回复我', description: '当有人回复你的帖子或评论时' },
                    { key: 'like', label: '有人赞我', description: '当有人赞了你的帖子或评论时' },
                    { key: 'follow', label: '有人关注我', description: '当有新用户关注你时' },
                    { key: 'system', label: '系统通知', description: '接收系统相关的通知' },
                    { key: 'email', label: '邮件通知', description: '重要通知同时发送邮件' },
                  ].map((item) => (
                    <div
                      key={item.key}
                      className="flex items-center justify-between rounded-lg border p-4"
                    >
                      <div>
                        <div className="font-medium">{item.label}</div>
                        <div className="text-sm text-muted-foreground">{item.description}</div>
                      </div>
                      <Switch
                        checked={
                          settings.preferences.notifications[
                            item.key as keyof typeof settings.preferences.notifications
                          ]
                        }
                        onCheckedChange={(checked) => updateNotification(item.key, checked)}
                      />
                    </div>
                  ))}
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>主题设置</CardTitle>
                  <CardDescription>选择你喜欢的主题模式</CardDescription>
                </CardHeader>
                <CardContent>
                  <RadioGroup
                    value={settings.preferences.theme}
                    onChange={(value) =>
                      setSettings((prev) => ({
                        ...prev,
                        preferences: { ...prev.preferences, theme: value as any },
                      }))
                    }
                    options={[
                      { value: 'light', label: '浅色模式', description: '使用明亮的主题' },
                      { value: 'dark', label: '深色模式', description: '使用暗色主题，护眼省电' },
                      { value: 'system', label: '跟随系统', description: '根据系统设置自动切换' },
                    ]}
                  />
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>语言设置</CardTitle>
                  <CardDescription>选择界面显示语言</CardDescription>
                </CardHeader>
                <CardContent>
                  <RadioGroup
                    value={settings.preferences.language}
                    onChange={(value) =>
                      setSettings((prev) => ({
                        ...prev,
                        preferences: { ...prev.preferences, language: value as any },
                      }))
                    }
                    options={[
                      { value: 'zh-CN', label: '简体中文', description: '使用简体中文界面' },
                    ]}
                  />
                </CardContent>
              </Card>
            </div>
          )}

          {activeTab === 'privacy' && (
            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>谁可以看到我的帖子</CardTitle>
                  <CardDescription>控制你的帖子可见范围</CardDescription>
                </CardHeader>
                <CardContent>
                  <RadioGroup
                    value={settings.privacy.postVisibility}
                    onChange={(value) => updatePrivacy('postVisibility', value)}
                    options={[
                      { value: 'everyone', label: '所有人', description: '所有人都可以看到你的帖子' },
                      { value: 'followers', label: '仅关注者', description: '只有关注你的人可以看到' },
                      { value: 'only_me', label: '仅自己', description: '只有你自己可以看到' },
                    ]}
                  />
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>谁可以关注我</CardTitle>
                  <CardDescription>控制谁可以关注你的账号</CardDescription>
                </CardHeader>
                <CardContent>
                  <RadioGroup
                    value={settings.privacy.followPermission}
                    onChange={(value) => updatePrivacy('followPermission', value)}
                    options={[
                      { value: 'everyone', label: '所有人', description: '所有人都可以关注你' },
                      { value: 'no_one', label: '不允许任何人', description: '没有人可以关注你' },
                    ]}
                  />
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>在线状态可见性</CardTitle>
                  <CardDescription>控制谁可以看到你的在线状态</CardDescription>
                </CardHeader>
                <CardContent>
                  <RadioGroup
                    value={settings.privacy.onlineStatus}
                    onChange={(value) => updatePrivacy('onlineStatus', value)}
                    options={[
                      { value: 'everyone', label: '所有人', description: '所有人都可以看到你是否在线' },
                      { value: 'followers', label: '仅关注者', description: '只有关注你的人可以看到' },
                      { value: 'no_one', label: '不显示', description: '不显示你的在线状态' },
                    ]}
                  />
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>黑名单</CardTitle>
                  <CardDescription>你拉黑的用户将无法与你互动</CardDescription>
                </CardHeader>
                <CardContent>
                  {settings.privacy.blacklist.length === 0 ? (
                    <div className="py-8 text-center text-muted-foreground">
                      暂无黑名单用户
                    </div>
                  ) : (
                    <div className="space-y-2">
                      {settings.privacy.blacklist.map((user) => (
                        <div
                          key={user.id}
                          className="flex items-center justify-between rounded-lg border p-3"
                        >
                          <div className="flex items-center gap-3">
                            <Avatar className="h-10 w-10">
                              <AvatarImage src={user.avatar} alt={user.username} />
                              <AvatarFallback>{user.username[0]}</AvatarFallback>
                            </Avatar>
                            <span className="font-medium">{user.username}</span>
                          </div>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => removeFromBlacklist(user.id)}
                          >
                            移除
                          </Button>
                        </div>
                      ))}
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>
          )}

          <div className="flex gap-3">
            <Button onClick={handleSave} disabled={saveMutation.isPending || passwordMutation.isPending}>
              <Save className="mr-2 h-4 w-4" />
              {saveMutation.isPending || passwordMutation.isPending ? '保存中...' : '保存修改'}
            </Button>
            <Button variant="outline" onClick={handleReset}>
              <RotateCcw className="mr-2 h-4 w-4" />
              重置
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
