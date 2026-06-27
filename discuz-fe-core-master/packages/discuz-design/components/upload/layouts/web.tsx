import React, { forwardRef, useContext, useEffect, useRef, useState, useImperativeHandle } from 'react';
import { ConfigContext } from '../../../extends/configContext';
import classnames from 'classnames';
import { UploadProps, UploadFile } from '../interface';
import { uuid } from '../../../utils/uuid';
import { fileToObject, isImageFileType } from '../utils';
import Icon from '../../icon';
import ImagePreviewer from '../../image-previewer';

/**
 * 拖拽
 */
function Dragger(props) {
  const { children, onFile } = props;

  const onDrop = (e) => {
    e.preventDefault();
    typeof onFile === 'function' && onFile(e.dataTransfer.files);
  };
  const handleDragover = (e) => {
    e.preventDefault();
  };
  const handleDragleave = (e) => {
    e.preventDefault();
  };

  return (
    <div
      className="dragger"
      onDrop={onDrop}
      onDragOver={handleDragover}
      onDragLeave={handleDragleave}
    >
      {children}
    </div>
  );
}

const getAttachIcon = (fileType) => {
  let type = fileType?.toString()?.toUpperCase().split('/')[1] || '';
  type = type.substr(type.lastIndexOf('.') + 1);
  let iconType = '';
  switch (type) {
    case 'XLS':
    case 'XLSX':
    case 'SHEET':
      iconType = 'xls-outlined.86ffbb304f441a3ac39d0a2b6559d119a876b992.png';
      break;
    case 'DOC':
    case 'DOCX':
    case 'DOCUMENT':
      iconType = 'doc-outlined.2c3f996d6c8e141beea3a4dd2e4f92e72927241c.png';
      break;
    case 'PPT':
    case 'PPTX':
    case 'PRESENTATION':
      iconType = 'ppt-outlined.c633840874bf2f06dd0dddc96f19f2698619e51e.png';
      break;
    case 'RAR':
    case 'ZIP':
    case 'X-ZIP-COMPRESSED':
      iconType = 'zip-outlined.8c5d95e8746ea9a5b940a03e8f83d5b1ddba0211.png';
      break;
    case 'PDF':
      iconType = 'pdf-outlined.e06cb6e0559e2f2abebaa07a54ff3b34b05a4165.png';
      break;
    case 'TXT':
    case 'PLAIN':
      iconType = 'text-outlined.3422bac383a7d71bba912db8b3912471ec2869f6.png';
      break;
    case 'MP4':
      iconType = 'video-outlined.75403451dd41be304dfcbefd530ec1d560f978f4.png';
      break;
    case 'M4A':
    case 'MP3':
    case 'MPEG':
      iconType = 'audio-outlined.d04f8b9380204fe1b1b671f59145695f56cc222d.png';
      break;
    case 'PNG':
    case 'JPEG':
      iconType = 'image-outlined.8aa1c2bd1fb9a0645e09136670cfb4020aa30be3.png';
      break;
    case 'FORM':
      iconType = 'form-outlined.7edcdca23038bdd7f2b72f2b897388e5d8acb79f.png';
      break;
    default:
      iconType = 'file-outlined.8dafcd0a20ee70430ba1d3420e015a232a64fa05.png';
      break;
  }
  return `https://imgcache.qq.com/operation/dianshi/other/${iconType}`;
};


const handleFileSize = (fileSize) => {
  if (!fileSize) return '';
  if (fileSize > 1024000) {
    return `${(fileSize / 1024000).toFixed(2)} MB`;
  }
  if (fileSize > 1024) {
    return `${(fileSize / 1024).toFixed(2)} KB`;
  }

  return `${fileSize} B`;
};


/**
 * 上传进度样式
 * @param props file文件
 */
function DefaultProgressRender(props) {
  const { file, listType } = props;
  const { clsPrefix } = useContext(ConfigContext);
  const componentClassName = classnames(`${clsPrefix}-upload-list-${listType}`);

  const [percent, setPercent] = useState(file.percent || 0);

  useEffect(() => {
    setTimeout(() => {
      setPercent(file.percent || 0);
    }, 0);
  }, [file.percent]);

  return (
    <div className={`${componentClassName}-process`}>
      <Icon className={`${componentClassName}-process__icon`} name="LoadingOutlined" size={20} />
      {percent > 0 && <span className={`${componentClassName}-process__text`}>{percent}%</span>}
    </div>
  );
}

/**
 * 上传文件展示列表
 */
function UploadFileList(props) {
  const { listType, fileList = [], onRemove, onPreview, progressRender } = props;
  const { clsPrefix } = useContext(ConfigContext);
  const componentClassName = classnames(`${clsPrefix}-upload-list-${listType}`);

  // 图片预览
  const [visible, setVisible] = React.useState(false);
  const [defaultImg, setDefaultImg] = React.useState(null);
  const [imgUrls, setImgUrls] = React.useState([]);
  const ImagePreviewerRef = React.useRef(null);

  // 预览图片组
  useEffect(() => {
    setImgUrls(fileList
      .filter(file => isImageFileType(file?.type) && (file.url || file.thumbUrl))
      .map(file => file.url || file.thumbUrl));
  }, [fileList.length]);

  // 删除文件
  const onRemoveFile = (file) => {
    onRemove(file);
  };

  // 预览文件
  const onPreviewFile = (file, index) => {
    onPreview(file);

    // 预览图片
    if (isImageFileType(file?.type) && (file.url || file.thumbUrl)) {
      setDefaultImg(imgUrls[index]);
      setTimeout(() => {
        ImagePreviewerRef.current.show();
      }, 0);
    }
  };

  let listElement = fileList.map((file, index) => (
    <div key={file.uid} className={classnames(`${componentClassName}__item`, {
      'is-error': file.status === 'error',
      'is-success': file.status === 'success',
    })}>
      <div className={`${componentClassName}__info`} onClick={() => onPreviewFile(file, index)}>
        {isImageFileType(file.type) && file.thumbUrl
          ? <img  src={file.thumbUrl} alt={file.name} className={`${componentClassName}__thumbUrl`} />
          : <img src={getAttachIcon(file?.type)} className={`${componentClassName}__icon`} alt={file.name}/>
        }
        <div className={`${componentClassName}__name`}>
          {file.name}
        </div>
        <div className={`${componentClassName}__filesize`}>{handleFileSize(file.size || file?.fileSize)}</div>
        {/* <div className={`${componentClassName}__size`}>{file.size || ''}</div> */}
      </div>
      <div className={`${componentClassName}__operate`} onClick={() => onRemoveFile(file)}>
        <Icon name="DeleteOutlined"></Icon>
      </div>
      {
        file.status === 'uploading'
          && (typeof progressRender === 'function'
            ? <div className={`${componentClassName}__process`}>
              {progressRender(file)}
              </div>
            : <DefaultProgressRender listType={listType} file={file}></DefaultProgressRender>
          )
      }
    </div>
  ));

  // 卡片模式
  if (listType === 'card') {
    listElement = fileList.map((file, index) => (
      <div key={file.uid} className={classnames(`${componentClassName}__item`, {
        'is-error': file.status === 'error',
      })}>
        {isImageFileType(file.type) && file.thumbUrl
          ? <img src={file.thumbUrl} alt={file.name} className={`${componentClassName}__thumbUrl`} onClick={() => onPreviewFile(file, index)} />
          : (
            <div className={`${componentClassName}__info`} onClick={() => onPreviewFile(file, index)}>
              <img src={getAttachIcon(file?.type)} className={`${componentClassName}__thumbUrl`} alt={file.name}/>
              <div className={`${componentClassName}__name`}>{file.name} {file.status} {file.percent}</div>
            </div>
          )
        }

        {/* 上传进度条 || 操作栏 */}
        {
          file.status === 'uploading'
            ? typeof progressRender === 'function'
              ? progressRender(file)
              : <DefaultProgressRender listType={listType} file={file}></DefaultProgressRender>
            : (
              <div className={`${componentClassName}__operate`} onClick={() => onRemoveFile(file)}>
                <Icon name="DeleteOutlined"></Icon>
              </div>
            )
        }
      </div>
    ));
  }

  return (
    <div className={componentClassName}>
      {listElement}

      {props.children}

      <ImagePreviewer
        visible={visible}
        ref={ImagePreviewerRef}
        onClose={() => {
          setVisible(false);
        }}
        imgUrls={imgUrls}
        currentUrl={defaultImg}
      />
    </div>
  );
}

/**
 * 文件上传组件
 * TODO: 通过ref抛出一些方法
 */
export const UploadWebLayout = (props: UploadProps, ref) => {
  const {
    className,
    style,
    listType,
    fileList,
    children,
    multiple,
    accept,
    limit,
    progressRender,
    onChange,
    onPreview,
    beforeUpload,
    customRequest,
    wxChooseImage,
  } = props;
  const { clsPrefix } = useContext(ConfigContext);

  fileList.forEach((file, index) => {
    file.uid = file.uid ?? `${index}__${uuid()}`;
  });

  const inputRef = useRef(null);

  const componentClassName = `${clsPrefix}-upload`;
  const uploadClassName = classnames(className, componentClassName, {
    'is-card': listType === 'card',
  });

  const [showFileList, setShowFileList] = useState(fileList);

  const onInternalChange = () => {
    // Cut to match count
    if (limit) {
      showFileList.splice(limit);
    }

    showFileList.forEach((file) => {
      try {
        file.thumbUrl = URL.createObjectURL(file.originFileObj);
      } catch (err) {
        return;
      }
    });

    setShowFileList(showFileList);

    typeof onChange === 'function' && onChange(showFileList);
  };

  // 上传文件
  const uploadFiles = async (files) => {
    let cloneList = [...files];

    cloneList = cloneList.map((file, index) => {
      file.uid = file.uid ?? `${index}__${uuid()}`;

      return fileToObject(file);
    });

    if (typeof beforeUpload === 'function') {
      // 上传前钩子
      const res = await beforeUpload(cloneList, showFileList);
      if (!res) {
        return;
      }
    }
    showFileList.push(...cloneList);

    onInternalChange(showFileList);

    if (limit) {
      cloneList = cloneList.slice(0, limit);
    }

    postFiles(cloneList);
  };

  // 发送文件
  const postFiles = (files: UploadFile[]) => {
    files.forEach((file) => {
      if (typeof customRequest === 'function') {
        // 自定义上传钩子
        customRequest(file, showFileList, onInternalChange)
          .then((res) => {
            if (!res) {
              file.status = 'error';
              return;
            }
            file.status = 'success';
          })
          .catch((err) => {
            file.status = 'error';
          })
          .finally(() => {
            onInternalChange(showFileList);
          });
      }
    });
  };

  // 删除文件
  const removeFile = (deleteFile) => {
    showFileList.splice(showFileList.findIndex(file => file.uid === deleteFile.uid), 1);

    onInternalChange(showFileList);
  };

  // 查看文件
  const previewFile = (file) => {
    typeof onPreview === 'function' && onPreview(file);
  };

  // input change事件
  const handleChange = (e, wxFiles) => {
    if (wxFiles) {
      uploadFiles(wxFiles);
      return;
    }

    if (e.target instanceof HTMLInputElement) {
      const { files } = e.target;
      if (!files) {
        return;
      }
      uploadFiles(files);

      inputRef.current.value = null;
    }
  };

  // 触发input事件
  const trggerInput = async (e) => {
    if (e.target.id === 'trgger-file-choose-input') {
      return;
    }

    if (typeof wxChooseImage === 'function') {
      const files = await wxChooseImage();
      if (files && files instanceof Array && files.length) {
        handleChange('', files);
      } else {
        inputRef.current.click();
      }
    } else {
      inputRef.current.click();
    }
  };

  return (
    <div className={uploadClassName} style={style}>
      <UploadFileList
        onRemove={removeFile}
        onPreview={previewFile}
        listType={listType}
        fileList={showFileList}
        progressRender={progressRender}
      >
        {
          limit && showFileList?.length >= limit ? '' : <div className={`${componentClassName}__area`} onClick={trggerInput}>
            <Dragger onFile={uploadFiles}>{children}</Dragger>

            <input
              id='trgger-file-choose-input'
              className={`${componentClassName}__input`}
              type="file"
              ref={inputRef}
              onChange={handleChange}
              multiple={multiple}
              accept={accept}
            />
          </div>
        }
      </UploadFileList>
    </div>
  );
};

UploadWebLayout.defaultProps = {
  listType: 'list',
  fileList: [],
};
