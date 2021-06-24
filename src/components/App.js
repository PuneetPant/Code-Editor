import React, { Component } from 'react';
import ReactDOM from "react-dom";
import AceEditor from "react-ace";
import './App.css';

import "ace-builds/src-min-noconflict/ext-language_tools";
import "ace-builds/src-noconflict/mode-html";
import "ace-builds/src-noconflict/snippets/html";
import "ace-builds/src-noconflict/theme-monokai";
import 'ace-builds/src-noconflict/theme-github';
import 'ace-builds/src-noconflict/theme-mono_industrial';
import 'ace-builds/src-noconflict/theme-nord_dark';
import 'ace-builds/src-noconflict/theme-tomorrow_night';
import 'ace-builds/src-noconflict/theme-tomorrow_night_blue';


class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            mode: '',
            theme: 'eclipse',
            fontSize: 14,
            editorContent: ''
        }
        this.appRef = React.createRef();
        this.modeRef = React.createRef();
        this.aceRef = React.createRef();
        this.onEditorChange = this.onEditorChange.bind(this);
        this.executeCode = this.executeCode.bind(this);
        this.editorContentValue = '';
    }

    onEditorChange(newValue) {
        this.editorContentValue = `${newValue}`;
    }

    executeCode = (e) => {
        console.log(this.editorContentValue);
        this.setState({
            editorContent: this.editorContentValue
        })
    }

    changeMode = (event) => {
        if (event.target.innerHTML === 'Dark Mode') {
            event.target.innerHTML = 'Light Mode'
            this.setState({
                theme: 'tomorrow_night_blue'
            })
            ReactDOM.findDOMNode(this.appRef.current).style.background = 'black';
        } else {
            event.target.innerHTML = 'Dark Mode'
            this.setState({
                theme: 'github'
            })
            ReactDOM.findDOMNode(this.appRef.current).style.background = '#f2f5fa';
        }

    }

    downloadCode = (e) => {

        const element = document.createElement("a");
        const file = new Blob([`${this.editorContentValue}`], {type: 'text/plain'});
        element.href = URL.createObjectURL(file);
        element.download = "download.txt";
        document.body.appendChild(element); 
        element.click();
    }

    render() {
        return (
            <div className="App" ref={this.appRef}>
                <div className="navbar">
                    <div className="button-container">
                        <button
                            className="button run-button spacing"
                            onClick={(e) => this.executeCode(e)}
                        >
                            Run
                            </button>
                        <button
                            className="button theme-button spacing"
                            // ref={this.modeRef}
                            onClick={(e) => this.changeMode(e)}
                        >Dark Mode</button>

                        <button
                            className="button save-button"
                            ref={this.saveRef}
                            onClick={(e) => this.downloadCode(e)}
                        >Save Code</button>
                    </div>
                </div>
                <div className="page-wrapper">
                    <div className="flex-split" >
                        <div className="flex-split-left" id="code-editor">
                            <AceEditor
                                mode="html"
                                theme={this.state.theme}
                                name="awesome-code"
                                height={"100%"}
                                width={"100%"}
                                onChange={this.onEditorChange}
                                fontSize={this.state.fontSize}
                                ref={this.aceRef}
                            />
                        </div>

                        <div className="" style={{ marginLeft: '10px' }}>
                            <iframe srcDoc={this.state.editorContent}
                                className="previewIframe"
                            ></iframe>
                        </div>
                    </div>
                </div>

            </div>
        );
    }
}

export default App;