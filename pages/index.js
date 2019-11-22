import React, { Component } from 'react'
import AutosizeInput from 'react-input-autosize'

import Step from '../components/step'
import Meta from '../components/meta'

const styleColored = {
  fontWeight: 'bold',
  fontSize: '1.1rem',
  border: '1px solid',
  borderRadius: '.1em'
}

const styleInput = {

}

export default class extends Component {
  state = {
    dinoName: ''
  }

  changeDinoName = e => {
    this.setState({ dinoName: e.target.value })
  }

  getName = () => this.state.dinoName || 'YOUR-DINO-NAME'

  render() {
    return (
      <>
        <Meta />
        <Step image="drawing-dino.png">
          <p>Draw your dino. Once you've got one, type the name of the dino here:</p>
          <AutosizeInput type="text" value={this.state.dinoName} onChange={this.changeDinoName} placeholder="drawing-dino" />
        </Step>
        <Step image="star.gif" subtitle="✨⭐️✨">
          <p>
            Now go to {' '}
            <a target="_blank" href="https://github.com/hackclub/dinosaurs">
            https://github.com/hackclub/dinosaurs
            </a> and click "star".
          </p>
        </Step>
        <Step image="new-branch.gif" subtitle="Create Branch: drawing-dino">
          <p>
            Find and click the dropdown "Branch: master ▼".
          </p>
          <p>Type in <strong>{this.getName()}</strong></p>
          <p>Click "Create branch: {this.getName()}"</p>
          <p><em>If it doesn't include "Create branch", that name is already taken. Choose a new name</em></p>
          <AutosizeInput type="text" value={this.state.dinoName} onChange={this.changeDinoName} placeholder="dancing-dino" />
        </Step>
        <Step image="upload.gif" subtitle="Upload your masterpiece">
          <p>Click "Upload files" and add your dino image</p>
          <p>Below "Commit changes", type <strong>Add {this.getName()}</strong> in the first text box</p>
          <p>Then click <span style={{...styleColored, color: 'rgb(52, 208, 88)'}}>COMMIT CHANGES</span></p>
        </Step>
        <Step image="start-editing-readme.gif" subtitle="Find and edit README.md">
          <p>Scroll through the list of files & find "README.md"</p>
          <p>To edit the file, click it & click the ✎ icon.</p>
        </Step>
        <Step image="edit-readme.gif" subtitle="Find and edit README.md">
          <p>Scroll through the list of files & find "README.md"</p>
          <p>To edit the file, click it & click the ✎ icon.</p>
          <pre>
            <code>
            "{this.getName()}"
            ![]({this.getName()})
            </code>
          </pre>
          <p>Below "Commit changes", type <strong>Add {this.getName()} to README</strong> in the first text box</p>
          <p>Then click <span style={{...styleColored, color: 'rgb(52, 208, 88)'}}>COMMIT CHANGES</span></p>
        </Step>
        <Step image="create-pr.gif">
          <p>Now if you go to 
<a target="_blank" href="https://github.com/hackclub/dinosaurs">
            https://github.com/hackclub/dinosaurs
            </a>, you should see a green button that says 
<span style={{...styleColored, color: 'rgb(52, 208, 88)'}}>Compare & pull request</span>. Click it, then click
<span style={{...styleColored, color: 'rgb(52, 208, 88)'}}>Create pull request</span>
          </p>
        </Step>
      </>
    )
  }
}