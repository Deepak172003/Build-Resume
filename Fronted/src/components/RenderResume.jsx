import React from "react";
import TemplateOne from './TemplateOne'
import TemplateTwo from "./TemplateTwo";
import TemplateThree from "./TemplateThree";

const RenderResume=({
  templatedId,
  resumeDate,
  contrainerWidth
})=>{
  switch(templatedId){
    case "01":
      return (
        <TemplateOne resumeDate={resumeDate}containerWidth={containerWidth}/>
        
      )
      case "o2":
        return (
          <TemplateTwo resumeDate={resumeDate}containerWidth={containerWidth}/>
        )
        case "03":
          return(
            <TemplateThree resumeDate={resumeDate}containerWidth={containerWidth}/>
          )
          default:
            return(
              <TemplateOne resumeData={resumeDate}containerWidth={contrainerWidth}/>
            )
  }
    
}
export default RenderResume