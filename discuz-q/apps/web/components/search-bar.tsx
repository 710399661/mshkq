'use client';

import { useState, useRef, useEffect, useCallback, useMemo } from 'react';
import { useRouter } from 'next/navigation';
import { Search, X, Loader2, FileText, User as UserIcon, Hash, Command } from 'lucide-react';
import { Input } from '@discuzq/ui/input';
import { Button } from '@discuzq/ui/button';
import { Avatar, AvatarImage, AvatarFallback } from '@discuzq/ui/avatar';
import { Skeleton } from '@discuzq/ui/skeleton';
import { useQuery } from '@tanstack/react-query';
import { getClientApi } from '@/lib/api';
import type { Thread, User, Tag } from '@discuzq/sdk/server';
import { cn } from '@discuzq/ui';

interface SearchSuggestion {
  type: 'post' | 'user' | 'tag';
  id: string;
  title: string;
  description?: string;
  avatar?: string;
  url: string;
}

interface SearchBarProps {
  placeholder?: string;
  autoFocus?: boolean;
  initialValue?: string;
  onSearch?: (query: string) => void;
  className?: string;
}

function useDebounce<T>(value: T, delay: number): T {
  const [debouncedValue, setDebouncedValue] = useState<T>(value);

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => {
      clearTimeout(timer);
    };
  }, [value, delay]);

  return debouncedValue;
}

export function SearchBar({
  placeholder = '搜索帖子、用户、话题...',
  autoFocus = false,
  initialValue = '',
  onSearch,
  className,
}: SearchBarProps) {
  const router = useRouter();
  const [query, setQuery] = useState(initialValue);
  const [isOpen, setIsOpen] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(-1);
  const inputRef = useRef<HTMLInputElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const debouncedQuery = useDebounce(query, 300);

  const { data, isLoading, isFetching } = useQuery({
    queryKey: ['search', 'suggestions', debouncedQuery],
    queryFn: async () => {
      if (!debouncedQuery.trim()) return { posts: [], users: [], tags: [] };
      const api = getClientApi();
      const [postsRes, usersRes, tagsRes] = await Promise.all([
        api.search.posts(debouncedQuery, { page: 1, per_page: 3 }).catch(() => ({ data: [] })),
        api.search.users(debouncedQuery, { page: 1, per_page: 3 }).catch(() => ({ data: [] })),
        api.search.tags(debouncedQuery, { page: 1, per_page: 3 }).catch(() => ({ data: [] })),
      ]);
      return {
        posts: (postsRes as { data: Thread[] }).data || [],
        users: (usersRes as { data: User[] }).data || [],
        tags: (tagsRes as { data: Tag[] }).data || [],
      };
    },
    enabled: debouncedQuery.trim().length > 0 && isOpen,
    staleTime: 60 * 1000,
  });

  const suggestions = useMemo<SearchSuggestion[]>(() => {
    const result: SearchSuggestion[] = [];

    if (data?.posts) {
      data.posts.forEach((post) => {
        result.push({
          type: 'post',
          id: String(post.id),
          title: post.title,
          description: post.summary?.slice(0, 60),
          url: `/thread/${post.id}`,
        });
      });
    }

    if (data?.users) {
      data.users.forEach((user) => {
        result.push({
          type: 'user',
          id: String(user.id),
          title: user.username,
          description: user.bio || user.signature,
          avatar: user.avatar,
          url: `/user/${user.id}`,
        });
      });
    }

    if (data?.tags) {
      data.tags.forEach((tag) => {
        result.push({
          type: 'tag',
          id: String(tag.id),
          title: tag.name,
          description: `${tag.thread_count} 篇帖子`,
          url: `/tag/${tag.id}`,
        });
      });
    }

    return result;
  }, [data]);

  const handleSelect = useCallback(
    (suggestion: SearchSuggestion) => {
      setIsOpen(false);
      if (onSearch) {
        onSearch(query);
      }
      router.push(suggestion.url as any);
    },
    [query, router, onSearch],
  );

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      if (!isOpen) {
        if (e.key === 'Enter' && query.trim()) {
          e.preventDefault();
          setIsOpen(false);
          if (onSearch) {
            onSearch(query);
          }
          router.push(`/search?q=${encodeURIComponent(query)}`);
        }
        return;
      }

      switch (e.key) {
        case 'ArrowDown':
          e.preventDefault();
          setSelectedIndex((prev) =>
            prev < suggestions.length - 1 ? prev + 1 : prev,
          );
          break;
        case 'ArrowUp':
          e.preventDefault();
          setSelectedIndex((prev) => (prev > 0 ? prev - 1 : -1));
          break;
        case 'Enter':
          e.preventDefault();
          if (selectedIndex >= 0 && suggestions[selectedIndex]) {
            handleSelect(suggestions[selectedIndex]);
          } else if (query.trim()) {
            setIsOpen(false);
            if (onSearch) {
              onSearch(query);
            }
            router.push(`/search?q=${encodeURIComponent(query)}`);
          }
          break;
        case 'Escape':
          e.preventDefault();
          setIsOpen(false);
          setSelectedIndex(-1);
          inputRef.current?.blur();
          break;
      }
    },
    [isOpen, selectedIndex, suggestions, query, router, handleSelect, onSearch],
  );

  useEffect(() => {
    setSelectedIndex(-1);
  }, [debouncedQuery]);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
        setSelectedIndex(-1);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        inputRef.current?.focus();
        setIsOpen(true);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'post':
        return <FileText className="h-4 w-4 text-muted-foreground" />;
      case 'user':
        return <UserIcon className="h-4 w-4 text-muted-foreground" />;
      case 'tag':
        return <Hash className="h-4 w-4 text-muted-foreground" />;
      default:
        return <Search className="h-4 w-4 text-muted-foreground" />;
    }
  };

  const getTypeLabel = (type: string) => {
    switch (type) {
      case 'post':
        return '帖子';
      case 'user':
        return '用户';
      case 'tag':
        return '话题';
      default:
        return '';
    }
  };

  return (
    <div ref={containerRef} className={cn('relative w-full', className)}>
      <div className="relative">
        <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
        <Input
          ref={inputRef}
          type="search"
          placeholder={placeholder}
          value={query}
          onChange={(e) => {
            setQuery(e.target.value);
            setIsOpen(true);
          }}
          onFocus={() => setIsOpen(true)}
          onKeyDown={handleKeyDown}
          autoFocus={autoFocus}
          className="w-full pl-8 h-9 text-sm pr-20"
        />
        <div className="absolute right-2 top-1/2 -translate-y-1/2 flex items-center gap-1">
          {query && (
            <Button
              type="button"
              variant="ghost"
              size="icon"
              className="h-6 w-6"
              onClick={() => {
                setQuery('');
                inputRef.current?.focus();
              }}
            >
              <X className="h-3.5 w-3.5" />
            </Button>
          )}
          <kbd className="hidden h-6 items-center gap-1 rounded border bg-muted px-1.5 text-[10px] font-medium text-muted-foreground md:flex">
            <Command className="h-3 w-3" />
            <span>K</span>
          </kbd>
        </div>
      </div>

      {isOpen && (query.trim() || isLoading) && (
        <div className="absolute top-full left-0 right-0 mt-1 w-full rounded-md border bg-popover text-popover-foreground shadow-md z-50 overflow-hidden">
          {isLoading || isFetching ? (
            <div className="p-2 space-y-2">
              {[1, 2, 3].map((i) => (
                <div key={i} className="flex items-center gap-3 p-2">
                  <Skeleton className="h-4 w-4 rounded" />
                  <div className="flex-1 space-y-1">
                    <Skeleton className="h-4 w-3/4" />
                    <Skeleton className="h-3 w-1/2" />
                  </div>
                </div>
              ))}
            </div>
          ) : suggestions.length === 0 ? (
            <div className="p-8 text-center text-sm text-muted-foreground">
              <Search className="mx-auto h-8 w-8 mb-2 opacity-50" />
              <p>没有找到相关结果</p>
              <p className="text-xs mt-1">
                按 <kbd className="px-1 py-0.5 rounded border bg-muted">Enter</kbd> 查看全部搜索结果
              </p>
            </div>
          ) : (
            <>
              <div className="max-h-80 overflow-y-auto">
                {suggestions.map((suggestion, index) => (
                  <button
                    key={`${suggestion.type}-${suggestion.id}`}
                    className={cn(
                      'flex w-full items-center gap-3 px-3 py-2 text-sm text-left hover:bg-accent transition-colors',
                      index === selectedIndex && 'bg-accent',
                    )}
                    onClick={() => handleSelect(suggestion)}
                    onMouseEnter={() => setSelectedIndex(index)}
                  >
                    {suggestion.type === 'user' ? (
                      <Avatar className="h-8 w-8 flex-shrink-0">
                        <AvatarImage src={suggestion.avatar} alt={suggestion.title} />
                        <AvatarFallback>
                          <UserIcon className="h-4 w-4" />
                        </AvatarFallback>
                      </Avatar>
                    ) : (
                      <div className="h-8 w-8 flex-shrink-0 flex items-center justify-center">
                        {getTypeIcon(suggestion.type)}
                      </div>
                    )}
                    <div className="flex-1 min-w-0">
                      <div className="font-medium truncate">{suggestion.title}</div>
                      {suggestion.description && (
                        <div className="text-xs text-muted-foreground truncate">
                          {suggestion.description}
                        </div>
                      )}
                    </div>
                    <div className="text-xs text-muted-foreground flex-shrink-0">
                      {getTypeLabel(suggestion.type)}
                    </div>
                  </button>
                ))}
              </div>
              <div className="border-t p-2">
                <button
                  className="flex w-full items-center justify-center gap-2 rounded-sm px-3 py-1.5 text-sm text-muted-foreground hover:bg-accent hover:text-foreground transition-colors"
                  onClick={() => {
                    setIsOpen(false);
                    if (onSearch) {
                      onSearch(query);
                    }
                    router.push(`/search?q=${encodeURIComponent(query)}`);
                  }}
                >
                  <Search className="h-4 w-4" />
                  查看全部搜索结果
                </button>
              </div>
            </>
          )}
        </div>
      )}
    </div>
  );
}
