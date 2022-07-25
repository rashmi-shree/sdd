import React from 'react';
import CustomizedText from '../../atoms/CustomizedText/CustomizedText';
import CustomizedTextInput from '../../atoms/CustomizedTextInput/CustomizedTextInput';
import '../../../style/style.css';

const TextAndTextInput = ({textname,inputChangeEvent, onChangeEvent, type}) => {
    return(
        <div className='textandtextcontainer'>
            <CustomizedText textname={textname}/>
            <CustomizedTextInput
                type={type} 
                onHandleChangeEvent={onChangeEvent}
                inputChangeEvent={inputChangeEvent}
            />
        </div>
    );
}
export default TextAndTextInput;