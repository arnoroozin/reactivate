import { Cropper } from "react-cropper";
import 'cropperjs/dist/cropper.css'

interface Props{
    imagePreview:string;
    setCropper:(cropper:Cropper)=>void;
}
export default function PhotoWidgetCropper({imagePreview,setCropper}:Props) {
  return (
    <Cropper
    src={imagePreview}
    style={{height:200,width:'100%'}}
    preview='.img-preview'
    initialAspectRatio={1}
    aspectRatio={1}
    guides={false}
    viewMode={1}
    autoCropArea={1}
    background={false}
    onInitialized={cropper=>setCropper(cropper)}
/>
  )
}
