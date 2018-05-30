import React from 'react';
import { Upload, Icon, message } from 'antd';

function getBase64(img, callback) {
  const reader = new FileReader();
  reader.addEventListener('load', () => callback(reader.result));
  reader.readAsDataURL(img);
}

function beforeUpload(file) {
  const isJPG = file.type === 'image/jpeg' || file.type === 'image/png';
  if (!isJPG) {
    message.error('You can only upload JPG/PNG file!');
  }
  const isLt2M = file.size / 1024 / 1024 < 2;
  if (!isLt2M) {
    message.error('Image must smaller than 2MB!');
  }
  return isJPG && isLt2M;
}

export default class Avatar extends React.Component {
  state = {
    loading: false,
    imageUrl: window.localStorage[this.props.name]
  };
  handleChange = (info) => {
    let __this = this;
      // Get this url from response in real world.
    getBase64(info.file.originFileObj, imageUrl => {this.setState({
      imageUrl,
      loading: false,
    }); window.localStorage[__this.props.name] = imageUrl});
  }

  render() {
    const uploadButton = (
      <div>
        <Icon type={this.state.loading ? 'loading' : 'plus'} />
        <div className="ant-upload-text">Upload</div>
      </div>
    );
    const imageUrl = this.state.imageUrl;
    return (
      <Upload
        name="avatar"
        listType="picture-card"
        className="avatar-uploader"
        showUploadList={false}
        beforeUpload={beforeUpload}
        onChange={this.handleChange}
        ref={this.props.ref}
      >
        {imageUrl ? <img src={imageUrl} style={{width: "100px", height: "100px"}} alt="avatar" /> : uploadButton}
      </Upload>
    );
  }
}