import React, { Component } from 'react'
import { Upload, Icon, Modal, message } from 'antd'
import { reqDeleteImg } from '../../api'
import PropTypes from 'prop-types'
import { BASE_IMG_URL } from "../../utils/constants"

// 用于图片上传的文件

function getBase64(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = error => reject(error);
  });
}

export default class PictureWall extends Component {

  static propTypes = {
    imgs: PropTypes.array
  }

  // state = {
  //   previewVisible: false, // 标识是否显示大图预览
  //   previewImage: '', // 大图的url
  //   fileList: [
  //     // {
  //     //   uid: '-1', // 每个file都有自己唯一的id
  //     //   name: 'image.png', // 图片文件名
  //     //   status: 'done', // 图片的状态: done-已上传, uploading-正在上传中, removed-已删除
  //     //   url: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png', // 图片地址
  //     // },
  //   ],
  // };

  constructor(props) {
    super(props)
    let fileList = []
    // 如果传入了imgs属性
    const {imgs} = this.props
    if (imgs && imgs.length > 0) {
      fileList = imgs.map((img, index) => ({
        uid: -index,
        name: img,
        status: 'done',
        url: BASE_IMG_URL + img
      }))
    }
    // 初始化状态
    this.state = {
      previewVisible: false, // 标识是否显示大图预览
      previewImage: '', // 大图的url
      fileList // 所有已上传的数组
    }
  }

  // 获取所有已上传图片文件名的数组
  getImgs = () => {
    return this.state.fileList.map(file => file.name)
  }

  // 隐藏Modal
  handleCancel = () => this.setState({ previewVisible: false });

  handlePreview = async file => {
    // 显示指定file的对应的缩略图
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj);
    }

    this.setState({
      previewImage: file.url || file.preview,
      previewVisible: true,
    });
  };

  // fileList: 所有已上传图片文件的数组, file: 当前操作的文件
  handleChange = async ({ file, fileList }) => {
    // 一旦上传成功, 将当前上传的file的信息修正(name, url)
    if (file.status === 'done') {
      const result = file.response
      if (result.status === 0) {
        message.success('上传图片成功')
        const {name, url} = result.data
        file = fileList[fileList.length - 1]
        file.name = name
        file.url = url
      } else {
        message.error('上传图片失败')
      }
    } else if (file.status === 'removed') {
      // 进行删除操作
      const result = await reqDeleteImg(file.name)
      if (result.status === 0) {
        message.success('删除图片成功')
      } else {
        message.error('删除图片失败')
      }
    }
    // 在操作过程中(上传/删除)即时更新状态
     this.setState({ fileList })
  }

  render() {
    const { previewVisible, previewImage, fileList } = this.state;
    const uploadButton = (
      <div>
        <Icon type="plus" />
        <div>Upload</div>
      </div>
    );
    return (
      <div>
        <Upload
          action="/manage/img/upload" // 上传图片的图片地址
          accept='image/*' // 只接收图片格式
          listType="picture-card" // 卡片样式
          name='image' // 请求参数名
          fileList={fileList} // 所有已上传图片文件对象的数组
          onPreview={this.handlePreview}
          onChange={this.handleChange}
        >
          {fileList.length >= 3 ? null : uploadButton}
        </Upload>
        <Modal visible={previewVisible} footer={null} onCancel={this.handleCancel}>
          <img alt="example" style={{ width: '100%' }} src={previewImage} />
        </Modal>
      </div>
    );
  }
}