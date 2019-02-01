import React from 'react';
import Dropzone from 'react-dropzone';
import './imageUpload.scss';
import {connect} from "react-redux";
import {FORM_NAME} from "../NewPost";
import {isEmpty} from "lodash";

class ImageUpload extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      files: []
    };
  }

  onDrop(files) {
    const { input: { onChange } } = this.props;
    onChange(files[0]);
    this.setState({
      files: files.map(file => Object.assign(file, {
        preview: URL.createObjectURL(file)
      }))
    });
    // let formData = new FormData();
    // files.forEach((im, idx) => formData.append('images', im));
    // const config = {headers: {'content-type': 'multipart/form-data'}};
    // auth_axios.post(`/v1/posts/post/image/`, formData, config).then(images => {
    //   this.props.addImages(images.data);
    //   self.setState({
    //     files: files.map(file => Object.assign(file, {
    //       preview: URL.createObjectURL(file)
    //     }))
    //   });
    // });
  }

  clear() {
    // Make sure to revoke the data uris to avoid memory leaks
    this.state.files.forEach(file => URL.revokeObjectURL(file.preview))
    this.setState({files: []});
  }

  componentWillReceiveProps(nextProps, nextContext) {
    if (isEmpty(this.props.form)) return;
    if (!isEmpty(this.state.files) && isEmpty(nextProps.form.values.images))
      this.clear();
  }

  componentWillUnmount() {
    this.clear()
  }

  render() {
    const {files} = this.state;

    const thumbs = files.map(file => (
      <div className={'thumb'} key={file.name}>
        <div className={'thumbInner'}>
          <img
            src={file.preview}
          />
        </div>
      </div>
    ));

    return (
      <section className="image-upload-wrapper">
        <Dropzone accept="image/*" onDrop={this.onDrop.bind(this)}>
          {({getRootProps, getInputProps, isDragActive}) => (
            <div {...getRootProps()} className={`image-upload ${isDragActive ? 'image-upload--isActive' : ''}`}>
              <input {...getInputProps()} name="images"/>
              Drop image here or or click to to upload
            </div>
          )}
        </Dropzone>
        <aside className="thumbsContainer">
          {thumbs}
        </aside>
      </section>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    form: state.form[FORM_NAME]
  }
}

export default connect(mapStateToProps, null) (ImageUpload);
