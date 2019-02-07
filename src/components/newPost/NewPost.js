import React, { Component } from 'react';
import {Button, Form} from "reactstrap";
import {Field, reduxForm, startSubmit, change, getFormSubmitErrors} from "redux-form";
import './newPost.scss';
import {connect} from "react-redux";
import {addNewPost} from "../../actions/action_posts";
import TextareaAutosize from "react-textarea-autosize";
import Loader from './loading.gif';
import DirectionProvider from "../DirectionProvider";
import {isEmpty} from "lodash";
import {activityFields, extraFields} from '../Fields/index';

export const FORM_NAME = 'NEW_POST';

const TextWrapper = ({input, id, className, required, placeholder}) => {
  return (
    <DirectionProvider text={input.value}>
      <TextareaAutosize minRows={3} id={id} className={className} required={required} placeholder={placeholder} {...input}/>
    </DirectionProvider>
  )
};

class NewPostForm extends Component {
  constructor(props) {
    super(props);
    let initActive = {};
    activityFields.forEach((a) => initActive[a.name] = false);
    this.state = { active: initActive};
  }

  toggleField = (f) => {
    const {active} = this.state;
    this.setState({active: {...active, [f]: !active[f]}});
    if (active[f]) {
      this.props.clearInput(f);
    }
  }

  render() {
    const {handleSubmit, pristine, submitting, addNewPost, submitErrors} = this.props;
    const {active} = this.state;
    return (
      <Form className="new-post-form" onSubmit={handleSubmit(addNewPost)}>
        <div className="field-buttons">
          {activityFields.map((f, idx) => <Button outline key={idx} onClick={() => this.toggleField(f.name)}>{f.icon}</Button>)}
        </div>
        {
          activityFields.map((f, idx) =>
            active[f.name] ? <Field component={f.component} name={f.name} key={idx} is_submitting={submitting}/> : '')
        }
        <Field component={TextWrapper} name="text" id="text" className="form-control text-field" placeholder="Write something"/>
        {
          extraFields.map((f, idx) =>
            <Field component={f.component} name={f.name} key={idx} is_submitting={submitting}/>)
        }
        {
          !pristine ? (<div className={'text-center submit-section'}>
            <Button color="primary ossome-button" type="submit" disabled={pristine || submitting}>Submit</Button>
            {
              !isEmpty(submitErrors) ?
                <div className="errors">{submitErrors.message}</div> :
                ""
            }
          </div>) : ''
        }

        { submitting ?
          <div className={'text-center'}>
            <img src={Loader} alt="loading" height="20px"/>
          </div> :
          ""
        }

      </Form>
    )
  }
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    clearInput: (field) => {
      dispatch(change(FORM_NAME, field, ''));
    },
    addNewPost: (post) => {
      dispatch(startSubmit(FORM_NAME));
      return dispatch(addNewPost(post));
    }
  }
}

const mapStateToProps = (state) => {
  return {
    submitErrors: getFormSubmitErrors(FORM_NAME)(state)
  }
}

const NewPost = connect(mapStateToProps, mapDispatchToProps) (NewPostForm);

export default reduxForm({
  form: FORM_NAME,
  initialValues: {
    images: []
  }
})(NewPost);
