import React, {useState} from 'react'

export default function TextForm(props) {
    const [text, setText] = useState('');

    
    const handleUcase = ()=>{
        setText(text.toUpperCase());
        props.showAlert("Converted to uppercase","success");
    }
    const handleLcase = ()=>{
        setText(text.toLowerCase());
        props.showAlert("Converted to lowercase","success");
    }
    const handleExtractEmail=()=>{
        let emailPattern = /[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/g;
        let emails = text.match(emailPattern);
        console.log(emails);
        return emails||[];
    }
    const handleOnChange=(event)=>{
        setText(event.target.value);
    }
    const handleClearText = ()=>{
        setText("");
        props.showAlert("Text cleared","success");
    }
    const handleCopy=()=>{
        let text = document.getElementById('exampleFormControlTextarea1');
        text.select();
        text.setSelectionRange(0,9999);
        navigator.clipboard.writeText(text.value);
        props.showAlert("Text copied","success");
    }
    const getLength=(arr)=>{
        let count=0;
        for(let i=0;i<arr.length;i++){
            if(arr[i]==='')continue;
            count++;
        }
        return count;
    }

    return (
        <>
            <div className='container'style={{color:props.mode==='light'?'black':'white', backgroundColor:props.mode==='light'?'white':'#042743'}}>
                <h5>{props.heading}</h5>
                <div className="mb-3">
                    <textarea className="form-control mybox" value={text} onChange={handleOnChange} id="exampleFormControlTextarea1" rows="8"
                    style={{color:props.mode==='light'?'black':'white', backgroundColor:props.mode==='light'?'white':'#042743'}}></textarea>
                </div>
                <button className="btn btn-primary mx-2 my-2" onClick={handleUcase}>Convert to Uppercase</button>
                <button className="btn btn-primary mx-2 my-2" onClick={handleLcase}>Convert to Lowercase</button>
                <button className="btn btn-primary mx-2 my-2" onClick={handleClearText}>Clear</button>
                <button className="btn btn-primary mx-2 my-2" onClick={handleCopy}>Copy</button>

            </div>
            <div className="container my-4" style={{color:props.mode==='light'?'black':'white', backgroundColor:props.mode==='light'?'white':'#042743'}}>
                <h5>Your Text Summary</h5>
                <p>Words: {getLength(text.split(" "))} and Characters: {text.length}</p>
                <p>Time taken to read: {0.008 * text.split(" ").length} Minutes</p>
                <h5>Preview</h5>
                <p>{text.length>0 ? text:'Write something in the above box to get the preview here'}</p>
                <h5>Emails</h5>
                <p>{handleExtractEmail().map((item,index)=>(
                    <span key={index}>{item}, </span>
                ))}</p>
            </div>
        </>
    );
}
