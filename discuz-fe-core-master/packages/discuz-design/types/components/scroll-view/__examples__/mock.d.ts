declare var _default: ({
    _jv: {
        type: string;
        id: string;
        relationships: {
            user: {
                data: {
                    type: string;
                    id: string;
                };
            };
            firstPost: {
                data: {
                    type: string;
                    id: string;
                };
            };
            category: {
                data: {
                    type: string;
                    id: string;
                };
            };
            question?: undefined;
        };
    };
    type: number;
    title: string;
    price: string;
    attachmentPrice: string;
    freeWords: number;
    viewCount: number;
    postCount: number;
    paidCount: number;
    rewardedCount: number;
    longitude: string;
    latitude: string;
    address: string;
    location: string;
    createdAt: string;
    updatedAt: string;
    isApproved: number;
    isSticky: boolean;
    isEssence: boolean;
    isSite: boolean;
    isAnonymous: boolean;
    isDraft: boolean;
    canBeReward: boolean;
    canViewPosts: boolean;
    canReply: boolean;
    canApprove: boolean;
    canSticky: boolean;
    canEssence: boolean;
    canDelete: boolean;
    canHide: boolean;
    canEdit: boolean;
    isRedPacket: number;
    redPacket: any;
    postContent: string;
    questionTypeAndMoney: {
        id: number;
        thread_id: number;
        post_id: number;
        type: number;
        user_id: number;
        answer_id: number;
        money: string;
        remain_money: string;
        created_at: string;
        updated_at: string;
        expired_at: string;
    };
    isDeleted: boolean;
    onlookerState: boolean;
    canFavorite: boolean;
    isFavorite: boolean;
    user: {
        _jv: {
            type: string;
            id: string;
            relationships: {
                groups: {
                    data: {
                        type: string;
                        id: string;
                    }[];
                };
            };
        };
        id: number;
        username: string;
        avatarUrl: string;
        isReal: boolean;
        threadCount: number;
        followCount: number;
        fansCount: number;
        likedCount: number;
        questionCount: number;
        signature: string;
        usernameBout: number;
        status: number;
        loginAt: string;
        joinedAt: string;
        expiredAt: string;
        createdAt: string;
        updatedAt: string;
        canEdit: boolean;
        canDelete: boolean;
        showGroups: boolean;
        registerReason: string;
        banReason: string;
        denyStatus: boolean;
        canBeAsked: boolean;
        canEditUsername: boolean;
        groups: {
            _jv: {
                type: string;
                id: string;
            };
            name: string;
            type: string;
            color: string;
            icon: string;
            default: boolean;
            isDisplay: boolean;
            isPaid: boolean;
            fee: number;
            days: number;
            scale: number;
            is_subordinate: boolean;
            is_commission: boolean;
            checked: number;
        }[];
    };
    firstPost: {
        _jv: {
            type: string;
            id: string;
            relationships: {
                images: {
                    data: {
                        type: string;
                        id: string;
                    }[];
                };
            };
        };
        replyPostId: any;
        replyUserId: any;
        commentPostId: any;
        commentUserId: any;
        summary: string;
        summaryText: string;
        replyCount: number;
        likeCount: number;
        createdAt: string;
        updatedAt: string;
        isApproved: number;
        canEdit: boolean;
        canApprove: boolean;
        canDelete: boolean;
        canHide: boolean;
        contentAttachIds: any[];
        ip: string;
        port: number;
        isDeleted: boolean;
        isFirst: boolean;
        isComment: boolean;
        rewards: any;
        redPacketAmount: number;
        canLike: boolean;
        isLiked: boolean;
        images: {
            _jv: {
                type: string;
                id: string;
            };
            order: number;
            type: number;
            type_id: number;
            isRemote: boolean;
            isApproved: number;
            url: string;
            attachment: string;
            extension: string;
            fileName: string;
            filePath: string;
            fileSize: number;
            fileType: string;
            thumbUrl: string;
        }[];
    };
    category: {
        _jv: {
            type: string;
            id: string;
        };
        name: string;
        description: string;
        icon: string;
        sort: number;
        parentid: number;
        property: number;
        thread_count: number;
        ip: string;
        created_at: string;
        updated_at: string;
        canCreateThread: boolean;
        checked: number;
        search_ids: string;
        children: any[];
    };
    id: string;
    _contentParse: {
        nodes: {
            node: string;
            tag: string;
            $screen: {
                width: number;
                height: number;
            };
            tagType: string;
            attr: {
                class: any;
                style: any;
            };
            classStr: string;
            nodes: ({
                node: string;
                text: string;
                tag?: undefined;
                $screen?: undefined;
                tagType?: undefined;
                styleStr?: undefined;
                classStr?: undefined;
                attr?: undefined;
                nodes?: undefined;
            } | {
                node: string;
                tag: string;
                $screen: {
                    width: number;
                    height: number;
                };
                tagType: string;
                styleStr: string;
                classStr: string;
                attr: {
                    style: any;
                    src: string;
                    alt: string;
                    class: any;
                    mode: string;
                    padding: number;
                    lazyLoad: boolean;
                    domain: string;
                    id?: undefined;
                    value?: undefined;
                };
                text?: undefined;
                nodes?: undefined;
            } | {
                node: string;
                tag: string;
                $screen: {
                    width: number;
                    height: number;
                };
                tagType: string;
                attr: {
                    id: string;
                    value: string;
                    class: any;
                    style: any;
                    src?: undefined;
                    alt?: undefined;
                    mode?: undefined;
                    padding?: undefined;
                    lazyLoad?: undefined;
                    domain?: undefined;
                };
                classStr: string;
                nodes: {
                    node: string;
                    text: string;
                }[];
                text?: undefined;
                styleStr?: undefined;
            })[];
        }[];
        imageUrls: any[];
    };
    question?: undefined;
} | {
    _jv: {
        type: string;
        id: string;
        relationships: {
            user: {
                data: {
                    type: string;
                    id: string;
                };
            };
            firstPost: {
                data: {
                    type: string;
                    id: string;
                };
            };
            category: {
                data: {
                    type: string;
                    id: string;
                };
            };
            question: {
                data: {
                    type: string;
                    id: string;
                };
            };
        };
    };
    type: number;
    title: string;
    price: string;
    attachmentPrice: string;
    freeWords: number;
    viewCount: number;
    postCount: number;
    paidCount: number;
    rewardedCount: number;
    longitude: string;
    latitude: string;
    address: string;
    location: string;
    createdAt: string;
    updatedAt: string;
    isApproved: number;
    isSticky: boolean;
    isEssence: boolean;
    isSite: boolean;
    isAnonymous: boolean;
    isDraft: boolean;
    canBeReward: boolean;
    canViewPosts: boolean;
    canReply: boolean;
    canApprove: boolean;
    canSticky: boolean;
    canEssence: boolean;
    canDelete: boolean;
    canHide: boolean;
    canEdit: boolean;
    isRedPacket: number;
    redPacket: any;
    postContent: string;
    questionTypeAndMoney: {
        id: number;
        thread_id: number;
        post_id: number;
        type: number;
        user_id: number;
        answer_id: number;
        money: string;
        remain_money: string;
        created_at: string;
        updated_at: string;
        expired_at: string;
    };
    isDeleted: boolean;
    onlookerState: boolean;
    canFavorite: boolean;
    isFavorite: boolean;
    user: {
        _jv: {
            type: string;
            id: string;
            relationships: {
                groups: {
                    data: {
                        type: string;
                        id: string;
                    }[];
                };
            };
        };
        id: number;
        username: string;
        avatarUrl: string;
        isReal: boolean;
        threadCount: number;
        followCount: number;
        fansCount: number;
        likedCount: number;
        questionCount: number;
        signature: string;
        usernameBout: number;
        status: number;
        loginAt: string;
        joinedAt: string;
        expiredAt: string;
        createdAt: string;
        updatedAt: string;
        canEdit: boolean;
        canDelete: boolean;
        showGroups: boolean;
        registerReason: string;
        banReason: string;
        denyStatus: boolean;
        canBeAsked: boolean;
        canEditUsername: boolean;
        groups: {
            _jv: {
                type: string;
                id: string;
            };
            name: string;
            type: string;
            color: string;
            icon: string;
            default: boolean;
            isDisplay: boolean;
            isPaid: boolean;
            fee: number;
            days: number;
            scale: number;
            is_subordinate: boolean;
            is_commission: boolean;
            checked: number;
        }[];
    };
    firstPost: {
        _jv: {
            type: string;
            id: string;
            relationships: {
                images: {
                    data: any[];
                };
            };
        };
        replyPostId: any;
        replyUserId: any;
        commentPostId: any;
        commentUserId: any;
        summary: string;
        summaryText: string;
        replyCount: number;
        likeCount: number;
        createdAt: string;
        updatedAt: string;
        isApproved: number;
        canEdit: boolean;
        canApprove: boolean;
        canDelete: boolean;
        canHide: boolean;
        contentAttachIds: any[];
        ip: string;
        port: number;
        isDeleted: boolean;
        isFirst: boolean;
        isComment: boolean;
        rewards: any;
        redPacketAmount: number;
        canLike: boolean;
        isLiked: boolean;
        images: any[];
    };
    category: {
        _jv: {
            type: string;
            id: string;
        };
        name: string;
        description: string;
        icon: string;
        sort: number;
        parentid: number;
        property: number;
        thread_count: number;
        ip: string;
        created_at: string;
        updated_at: string;
        canCreateThread: boolean;
        checked: number;
        search_ids: string;
        children: any[];
    };
    question: {
        _jv: {
            type: string;
            id: string;
            relationships: {
                beUser: {
                    data: {
                        type: string;
                        id: string;
                    };
                };
            };
        };
        thread_id: number;
        user_id: number;
        be_user_id: number;
        content: string;
        content_html: any;
        ip: string;
        port: number;
        price: string;
        onlooker_unit_price: string;
        onlooker_price: string;
        onlooker_number: number;
        is_onlooker: boolean;
        is_answer: number;
        is_approved: number;
        created_at: string;
        updated_at: string;
        expired_at: string;
        answered_at: any;
        beUser: {
            _jv: {
                type: string;
                id: string;
                relationships: {
                    groups: {
                        data: {
                            type: string;
                            id: string;
                        }[];
                    };
                };
            };
            id: number;
            username: string;
            avatarUrl: string;
            isReal: boolean;
            threadCount: number;
            followCount: number;
            fansCount: number;
            likedCount: number;
            questionCount: number;
            signature: string;
            usernameBout: number;
            status: number;
            loginAt: string;
            joinedAt: string;
            expiredAt: string;
            createdAt: string;
            updatedAt: string;
            canEdit: boolean;
            canDelete: boolean;
            showGroups: boolean;
            registerReason: string;
            banReason: string;
            denyStatus: boolean;
            canBeAsked: boolean;
            canEditUsername: boolean;
            groups: {
                _jv: {
                    type: string;
                    id: string;
                };
                name: string;
                type: string;
                color: string;
                icon: string;
                default: boolean;
                isDisplay: boolean;
                isPaid: boolean;
                fee: number;
                days: number;
                scale: number;
                is_subordinate: boolean;
                is_commission: boolean;
                checked: number;
            }[];
        };
    };
    id: string;
    _contentParse: {
        nodes: {
            node: string;
            tag: string;
            $screen: {
                width: number;
                height: number;
            };
            tagType: string;
            attr: {
                class: any;
                style: any;
            };
            classStr: string;
            nodes: ({
                node: string;
                text: string;
                tag?: undefined;
                $screen?: undefined;
                tagType?: undefined;
                styleStr?: undefined;
                classStr?: undefined;
                attr?: undefined;
            } | {
                node: string;
                tag: string;
                $screen: {
                    width: number;
                    height: number;
                };
                tagType: string;
                styleStr: string;
                classStr: string;
                attr: {
                    style: any;
                    src: string;
                    alt: string;
                    class: any;
                    mode: string;
                    padding: number;
                    lazyLoad: boolean;
                    domain: string;
                };
                text?: undefined;
            })[];
        }[];
        imageUrls: any[];
    };
} | {
    _jv: {
        type: string;
        id: string;
        relationships: {
            user: {
                data: {
                    type: string;
                    id: string;
                };
            };
            firstPost: {
                data: {
                    type: string;
                    id: string;
                };
            };
            category: {
                data: {
                    type: string;
                    id: string;
                };
            };
            question?: undefined;
        };
    };
    type: number;
    title: string;
    price: string;
    attachmentPrice: string;
    freeWords: number;
    viewCount: number;
    postCount: number;
    paidCount: number;
    rewardedCount: number;
    longitude: string;
    latitude: string;
    address: string;
    location: string;
    createdAt: string;
    updatedAt: string;
    isApproved: number;
    isSticky: boolean;
    isEssence: boolean;
    isSite: boolean;
    isAnonymous: boolean;
    isDraft: boolean;
    canBeReward: boolean;
    canViewPosts: boolean;
    canReply: boolean;
    canApprove: boolean;
    canSticky: boolean;
    canEssence: boolean;
    canDelete: boolean;
    canHide: boolean;
    canEdit: boolean;
    isRedPacket: number;
    redPacket: {
        id: number;
        thread_id: number;
        post_id: number;
        rule: number;
        condition: number;
        likenum: number;
        money: string;
        number: number;
        remain_money: string;
        remain_number: number;
        status: number;
        created_at: string;
        updated_at: string;
    };
    postContent: string;
    questionTypeAndMoney: any;
    isDeleted: boolean;
    canFavorite: boolean;
    isFavorite: boolean;
    user: {
        _jv: {
            type: string;
            id: string;
            relationships: {
                groups: {
                    data: {
                        type: string;
                        id: string;
                    }[];
                };
            };
        };
        id: number;
        username: string;
        avatarUrl: string;
        isReal: boolean;
        threadCount: number;
        followCount: number;
        fansCount: number;
        likedCount: number;
        questionCount: number;
        signature: string;
        usernameBout: number;
        status: number;
        loginAt: string;
        joinedAt: string;
        expiredAt: any;
        createdAt: string;
        updatedAt: string;
        canEdit: boolean;
        canDelete: boolean;
        showGroups: boolean;
        registerReason: string;
        banReason: string;
        denyStatus: boolean;
        canBeAsked: boolean;
        canEditUsername: boolean;
        groups: {
            _jv: {
                type: string;
                id: string;
            };
            name: string;
            type: string;
            color: string;
            icon: string;
            default: boolean;
            isDisplay: boolean;
            isPaid: boolean;
            fee: number;
            days: number;
            scale: number;
            is_subordinate: boolean;
            is_commission: boolean;
            checked: number;
        }[];
    };
    firstPost: {
        _jv: {
            type: string;
            id: string;
            relationships: {
                images: {
                    data: any[];
                };
            };
        };
        replyPostId: any;
        replyUserId: any;
        commentPostId: any;
        commentUserId: any;
        summary: string;
        summaryText: string;
        replyCount: number;
        likeCount: number;
        createdAt: string;
        updatedAt: string;
        isApproved: number;
        canEdit: boolean;
        canApprove: boolean;
        canDelete: boolean;
        canHide: boolean;
        contentAttachIds: any[];
        ip: string;
        port: number;
        isDeleted: boolean;
        isFirst: boolean;
        isComment: boolean;
        rewards: any;
        redPacketAmount: number;
        canLike: boolean;
        isLiked: boolean;
        images: any[];
    };
    category: {
        _jv: {
            type: string;
            id: string;
        };
        name: string;
        description: string;
        icon: string;
        sort: number;
        parentid: number;
        property: number;
        thread_count: number;
        ip: string;
        created_at: string;
        updated_at: string;
        canCreateThread: boolean;
        checked: number;
        search_ids: string;
        children: any[];
    };
    id: string;
    _contentParse: {
        nodes: {
            node: string;
            tag: string;
            $screen: {
                width: number;
                height: number;
            };
            tagType: string;
            attr: {
                class: any;
                style: any;
            };
            classStr: string;
            nodes: {
                node: string;
                text: string;
            }[];
        }[];
        imageUrls: any[];
    };
    onlookerState?: undefined;
    question?: undefined;
})[];
export default _default;
