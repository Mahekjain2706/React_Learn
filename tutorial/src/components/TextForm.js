import React,{useState} from 'react'

export default function TextForm(props) {
    const handleUpClick = () =>{
        // console.log("UpperCase was clicked" + text);
        let newText =text.toUpperCase();
        setText(newText);
        props.showAlert("Convert Into UpperCase!","primary");
    }
    const handleDownClick = () =>{
        // console.log("UpperCase was clicked" + text);
        let newText =text.toLowerCase();
        setText(newText);
        props.showAlert("Convert Into UpperCase!","success");
    }
    const handleClearClick = () =>{
        // console.log("LowerCase was clicked" + text);
        let newText = '';
        setText(newText);
        props.showAlert("Clear Text!","danger");
    }
    const handleCopy = () =>{
        // var text = document.getElementById("myBox");
        // text.select();  // no need
        navigator.clipboard.writeText(text);
        // document.getSelection().removeAllRanges();
        props.showAlert("Copied Text!","warning");
    }
    const handleExtraSpaces = () =>{
        let newText = text.split(/[ ]+/);
        setText(newText.join(" "));
        props.showAlert("Extra Space Removed!","info");
    }
    const speak = () => {
        let msg = new SpeechSynthesisUtterance(text);
        window.speechSynthesis.speak(msg);
        props.showAlert("Speak loud!","success");
        const toogle = document.getElementById('toggle')
        if (toogle.textContent === "Speak") {
            toogle.innerHTML = "Stop"
        }
        else {
            toogle.innerHTML = "Speak"
            if (toogle.innerHTML === "Speak"){
                window.speechSynthesis.cancel()
            }
        }
    }

    const handleOnChange = (event) =>{
        // console.log("On Change");
        setText(event.target.value);
    }
    
    // event.target.value update the text + new value.
    // USE STATE HOOK
    const [text,setText] = useState('');
    // text nam ka variable value change by setText 
    // function.'text = "vghjnda"  // wrong way
    // setText("new Text");   // correct way
   // word and character counter
    return (
        <>
        <div className="container" style={{color: props.mode==='dark'?'white':'black'}} >
            <h1>{props.heading}</h1>
            <div className="mb-3">
                <textarea className="form-control" style={{backgroundColor: props.mode==='light'?'white':'#112b45', color: props.mode==='light'?'black':'white'}} value={text} onChange={handleOnChange} id="myBox" rows="8"></textarea>
            </div>
            <button disabled={text.length===0} className="btn btn-primary mx-1 my-1" onClick={handleUpClick}>Convert To Uppercase</button>
            <button disabled={text.length===0} className="btn btn-primary mx-1 my-1" onClick={handleDownClick} > Convert To Lowercase</button>
            <button disabled={text.length===0} className="btn btn-primary mx-1 my-1" onClick={handleClearClick} > Clear Text </button>
            <button disabled={text.length===0} onClick={speak} className="btn btn-primary mx-1 my-1">Speak</button>
            <button disabled={text.length===0} onClick={handleCopy} className="btn btn-primary mx-1 my-1">Copy Text</button>
            <button disabled={text.length===0} onClick={handleExtraSpaces} className="btn btn-primary mx-1 my-1">Remove Extra Spaces</button>


        </div>
        <div className="container my-3" style={{color: props.mode==='dark'?'white':'black'}}>
            <h2>Your Text Summary</h2>
            <p>{text.split(/\s+/).filter((element)=>{return element.length!==0}).length} words and {text.length} characters</p>
            <p>{text.split(".").length-1} senetnces</p>

            <p>{0.008 * (text.split(" ").filter((element)=>{return element.length!==0}).length)} Minutes to read.</p>
            <h2>Preview</h2>
            <p>{text.length>0?text:"Nothing to Preview !!"}</p>
        </div>
        </>
    )
}
// concept of states
// every component have one state (awastha) content inside it that we write we want to make it variable so it get render.