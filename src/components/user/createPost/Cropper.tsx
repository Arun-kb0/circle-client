import React, { useEffect, useRef, useState } from 'react'
import 'react-image-crop/dist/ReactCrop.css'
import ReactCrop, { PixelCrop, Crop } from 'react-image-crop'
import { selectPostImageToCrop, setCroppedImage } from '../../../features/post/postSlice'
import { useDispatch, useSelector } from 'react-redux'
import { toast } from 'react-toastify'
import { canvasPreview } from '../../../util/cropImage'
import { BsFillCloudDownloadFill } from 'react-icons/bs'
import { AiOutlineRotateRight } from 'react-icons/ai'

type Props = {}


const Cropper = (props: Props) => {
  const dispatch = useDispatch()

  const imgRef = useRef(null);
  const [rotation, setRotation] = useState(0);
  const [scale, setScale] = useState(1);
  const [height, setHeight] = useState('');
  const [width, setWidth] = useState('');

  const imageUrl = useSelector(selectPostImageToCrop)

  const [completedCrop, setCompletedCrop] = useState<PixelCrop | null>(null)
  const [crop, setCrop] = useState<Crop>({
    unit: 'px', // Can be 'px' or '%'
    x: 25,
    y: 25,
    width: 50,
    height: 50
  })

  const onZoom = (e: any) => {
    setScale(parseFloat(e));
  };

  const rotateRight = () => {
    let newRotation = rotation + 90;
    if (newRotation >= 360) {
      newRotation = -360;
    }
    setRotation(newRotation);
  };

  const download = async () => {
    await canvasPreview(imgRef.current, completedCrop, scale, rotation, true);
    toast('cropped image downloaded')
  };

  const useInEditImage = async () => {
    const res = await canvasPreview(imgRef.current, completedCrop, scale, rotation);
    console.log(res)
    const data = res as any
    dispatch(setCroppedImage({ url: data.url, blob: data.blob }))
    toast('cropped image ready to use in edit section')
  };


  const onImageLoad = (e:any) => {
    setHeight(e?.currentTarget?.height);
    setWidth(e?.currentTarget?.width);
    setCompletedCrop({
      x: 0,
      y: 0,
      height: e?.currentTarget?.height,
      width: e?.currentTarget?.width,
      unit: 'px'
    });
  };

  return (
    <section className="w-[100vh] h-auto flex justify-center items-center bg-gray-800 p-10 rounded-lg shadow-lg">
      <div className="block">
        <ReactCrop
          src={imageUrl}
          crop={crop}
          onChange={(_, percentCrop) => {
            setCrop(percentCrop);
          }}
          onComplete={(e) => {
            if (e?.height == 0 || e?.width == 0) {
              setCompletedCrop({
                x: 0,
                y: 0,
                height: Number(height),
                width: Number(width),
                unit: 'px'
              });
            } else {
              setCompletedCrop(e);
            }
          }}
        >
          <img
            ref={imgRef}
            crossOrigin='anonymous'
            alt='Error'
            src={imageUrl}
            style={{ transform: `scale(${scale}) rotate(${rotation}deg)` }}
            onLoad={onImageLoad}
          />
        </ReactCrop>
        <div className='flex justify-center items-center p-2 pb-3'>
          <input
            type='range'
            min={0.1}
            max={3}
            step={0.05}
            value={scale}
            onInput={(e: any) => {
              onZoom(e.target.value);
            }}
            className={'slider'}
          ></input>
          <span className={'rangeText'}>Zoom In/Out</span>
        </div>

        <div className='flex gap-4 justify-center items-center '>
          <button onClick={rotateRight} className="text-blue-700 border border-blue-700 hover:bg-blue-700 hover:text-white focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-full text-sm p-2.5 text-center inline-flex items-center dark:border-blue-500 dark:text-blue-500 dark:hover:text-white dark:focus:ring-blue-800 dark:hover:bg-blue-500">
            <AiOutlineRotateRight />
          </button>
          <button onClick={download} className="text-blue-700 border border-blue-700 hover:bg-blue-700 hover:text-white focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-full text-sm p-2.5 text-center inline-flex items-center dark:border-blue-500 dark:text-blue-500 dark:hover:text-white dark:focus:ring-blue-800 dark:hover:bg-blue-500">
            <BsFillCloudDownloadFill />
          </button>
          <button onClick={useInEditImage} className="text-blue-700 border border-blue-700 hover:bg-blue-700 hover:text-white focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-full text-sm p-2.5 text-center inline-flex items-center dark:border-blue-500 dark:text-blue-500 dark:hover:text-white dark:focus:ring-blue-800 dark:hover:bg-blue-500">
            Use in edit page
          </button>
        </div>

      </div>
    </section>
  )
}

export default Cropper