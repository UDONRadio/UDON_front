import React from 'react';
import { Segment, Icon, List } from 'semantic-ui-react';

const Pending = (props) => (
  <Segment>
    <Icon name='circle notched' loading/>
    {props.id}
  </Segment>
)

const Upload = (props) => {
  const content= (props.processed) ? "Ready to tag !" : "Waiting for server processing"
  return <Segment key={props.id}>
    <List.Icon name={props.up_from ? 'youtube' : 'file audio outline'}/>
    <List.Content>
      <List.Header content={props.up_from || props.audio}/>
      <List.Description content={content}/>
    </List.Content>
  </Segment>
}

const UploadStatus = (props) => {

  const should_display = Boolean(props.uploads.length + props.pending.length)
  return should_display && <Segment.Group id="upload-list">
    {
      props.pending.map((id) => (
        <Pending key={id} id={id}/>
      ))
    }
    {
      props.uploads && props.uploads.map((upload) => (
        <Upload key={upload.id} { ...upload }>
        </Upload>
      ))
    }
  </Segment.Group>
}

export default UploadStatus;
