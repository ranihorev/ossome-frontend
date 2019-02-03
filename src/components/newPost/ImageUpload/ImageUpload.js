import React from 'react';
import Dropzone from 'react-dropzone';
import './imageUpload.scss';
import {connect} from "react-redux";
import {FORM_NAME} from "../NewPost";

class ImageUpload extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      files: []
    };
  }

  onDrop(files) {
    const { input: { onChange } } = this.props;
    onChange(files);
    this.setState({
      files: files.map(file => Object.assign(file, {
        preview: URL.createObjectURL(file)
      }))
    });
  }

  clear() {
    // Make sure to revoke the data uris to avoid memory leaks
    this.state.files.forEach(file => URL.revokeObjectURL(file.preview))
    this.setState({files: []});
  }

  componentWillReceiveProps(nextProps, nextContext) {
    if ((this.props.is_submitting) && (!nextProps.is_submitting))
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
          <img src={file.preview} alt="preview"/>
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
