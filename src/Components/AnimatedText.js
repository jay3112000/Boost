import React from "react";
import TextTransition, { presets } from "react-text-transition";
import '../Components/AnimatedText.css';
const TEXTS = [
  "Hi There!",
  "My Name is",
  "Jay Sharma",
  
];

function ExampleOne (){
  const [index, setIndex] = React.useState(0);

  React.useEffect(() => {
    const intervalId = setInterval(() =>
      setIndex(index => index + 1),
      2000 // every 3 seconds
    );
    return () => clearTimeout(intervalId);
  }, []);

  return (
    <div className='box'>
    <h1 className='styletext'>
          <TextTransition
            className='display-1 my-4 fst-italic'
            text={ TEXTS[index % TEXTS.length] }
            springConfig={ presets.wobbly }
          />
        </h1>
    </div>
   
  );
};
export default ExampleOne;