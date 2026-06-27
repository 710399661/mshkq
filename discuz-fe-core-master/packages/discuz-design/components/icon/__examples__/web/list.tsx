import React from 'react';
import { Icon, Card, Flex, Toast } from '@discuzq/design';
import './list.scss';
import layouts from '../../../../styles/index.scss';

const { Row, Col } = Flex;

export default function DefaultSize() {
  const iconList = [
    'ExperienceOutlined', 'PermissionOutlined',
    'UnlockOutlined', 'FissionOutlined', 'HelpOutlined',
    'ShopOutlined', 'TimeOutlined', 'ApplyOutlined',
    'VoteOutlined', 'SuccessOutlined', 'FunnelOutlined',
    'WonderfulOutlined', 'PictureOutlined', 'PictureErrorOutlined',
    'MyPrivateLetterOutlined', 'SignOutOutlined', 'PersonalOutlined',
    'IncreaseOutlined', 'GoldCoinOutlined', 'DollarLOutlined',
    'TipsOutlined', 'AnonymityOutlined', 'LeftOutlined',
    'UploadingOutlined', 'PPTOutlined', 'XLSOutlined',
    'DOCOutlined', 'IntroduceOutlined', 'CollectFunOutlined',
    'RedactOutlined', 'HotBigOutlined', 'TopOutlined',
    'UpwardOutlined', 'WeChatOutlined', 'BackspaceOutlined',
    'WechatPaymentOutlined', 'ScanOutlined', 'PurseOutlined',
    'PlayOutlined', 'PauseOutlined', 'InProgressOutlined',
    'CloseOutlined', 'ShieldOutlined', 'RemindOutlined',
    'RenminbiOutlined', 'RetrieveOutlined', 'ScreenOutlined',
    'TabOutlined', 'TicklerOutlined', 'TransferOutOutlined',
    'PayOutlined', 'WallOutlined', 'WithdrawOutlined',
    'CameraOutlined', 'CollectOutlined', 'CompileOutlined',
    'DiscussOutlined', 'IncomeOutlined', 'LeaveWordOutlined',
    'NewsOutlined', 'NotbookOutlined', 'NotepadOutlined',
    'PraiseOutlined', 'RecycleBinOutlined', 'BroadcastOutlined',
    'MoreOutlined', 'SuspendOutlined', 'PostOutlined',
    'WrongOutlined', 'MemberOutlined', 'UserOutlined',
    'PhoneOutlined', 'WeChatOutlinedThick', 'AtOutlined',
    'BiasOutlined', 'CentralLineOutlined', 'CheckOutlined',
    'CollectOutlinedBig', 'CommentOutlined', 'DeleteOutlined',
    'EditOutlined', 'ExactnessOutlined', 'EyeOutlined',
    'FindOutlined', 'FormOutlined', 'HomeOutlined',
    'HotOutlined', 'PaperClipOutlined', 'LikeOutlined',
    'LoadingOutlined', 'MailOutlined', 'MakeSthOutlined',
    'MenuOutlined', 'MessageOutlined', 'MicroOutlined',
    'MoreBOutlined', 'MoreVOutlined', 'PictureOutlinedBig',
    'PlusOutlined', 'PositionOutlined', 'PoweroffOutlined',
    'HeartOutlined', 'ProfessionOutlined', 'QuestionOutlined',
    'RenovateOutlined', 'WarnOutlinedThick', 'WarnOutlined',
    'ReturnOutlined', 'RightOutlined', 'SearchOutlined',
    'SecondaryMenuOutlined', 'SettingOutlined', 'ShareAltOutlined',
    'SharpOutlined', 'ShoppingCartOutlined', 'SmilingFaceOutlined',
    'SortOutlined', 'StrongSharpOutlined', 'UnderlineOutlined',
    'UnderOutlined', 'VideoOutlined', 'RedPacketOutlined',
  ];
  return (
    <>
      <Row style={{
        width: '100%',
      }}>
        {iconList.map((iconName, index) => (
          <Col key={index} flex={0}>
            <Card
              className={'icon-list'}
              style={{
                width: 150,
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                cursor: 'pointer',
              }}
            >
              <div
                style={{
                  width: '100%',
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                }}
                onClick={() => {
                  const input = document.createElement('input');
                  document.body.appendChild(input);
 	                input.setAttribute('value', iconName);
                  input.select();
                  if (document.execCommand('copy')) {
                    document.execCommand('copy');
                    Toast.success({
                      content: '复制Icon Name成功',
                    });
                  }
                  document.body.removeChild(input);
                }}
              >
                <Icon name={iconName} size={'large'} />
              </div>
              <div
                style={{
                  marginTop: '8px',
                }}
              >
                {iconName}
              </div>
            </Card>
          </Col>
        ))}
      </Row>
    </>
  );
}
