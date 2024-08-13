import React, { useRef, useState, useEffect } from 'react';
import 'tui-image-editor/dist/tui-image-editor.css';
import ImageEditor from 'tui-image-editor';
import '../App.css';
import ImageUploader from './ImageUploader';
import FilterControls from './FilterControls';
import FlipControls from './FlipControls';
import RotateControls from './RotateControls';
import AddTextControls from './AddTextControls';
import ZoomControls from './ZoomControls';
import DrawingModeControls from './DrawingModeControls';
import AddShapeControls from './AddShapeControls';
import { Container } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faRotateLeft, faRotateRight } from '@fortawesome/free-solid-svg-icons';
import CropControls from './CropControls';

const ImageEditorComponent = () => {
  const containerRef = useRef(null);
  const editorRef = useRef(null);
  const [isImageLoaded, setIsImageLoaded] = useState(false);
  const [file, setFile] = useState(null);
  const [originalFileName, setOriginalFileName] = useState('');
  const [originalImageDataUrl, setOriginalImageDataUrl] = useState('');
  const [selectedProps, setSelectedProps] = useState({});
  const [zoomLevel, setZoomLevel] = useState(1.0);
  const [isCropMode, setIsCropMode] = useState(false);
  const [cropRect, setCropRect] = useState(null);

  useEffect(() => {
    if (containerRef.current) {
      editorRef.current = new ImageEditor(containerRef.current, {
        cssMaxWidth: 1000,
        cssMaxHeight: 700,
        selectionStyle: {
          cornerSize: 20,
          rotatingPointOffset: 70
        }
      });

      editorRef.current.on('objectActivated', (props) => {
        setSelectedProps(props);
      });
    }
  }, []);

  const updateSelectedProps = () => {
    if (editorRef.current && selectedProps) {
      editorRef.current.getObjectProperties(selectedProps.id, selectedProps)
        .then(newProps => {
          setSelectedProps({
            ...newProps,
            id: selectedProps.id
          });
        })
        .catch(error => {
          console.error('Error updating selected properties:', error);
        });
    }
  };

  const handleFileChange = (event) => {
    const selectedFile = event.target.files[0];
    if (selectedFile) {
      setFile(selectedFile);
      setOriginalFileName(selectedFile.name);
      const reader = new FileReader();
      reader.onload = (e) => {
        setOriginalImageDataUrl(e.target.result);
      };
      reader.readAsDataURL(selectedFile);

      if (editorRef.current) {
        editorRef.current.loadImageFromFile(selectedFile, 'Uploaded Image').then(() => {
          setIsImageLoaded(true);
        }).catch(error => {
          console.error("파일 로드 실패:", error);
        });
      }
    }
  };

  const applyFilter = (type, options = {}, isSilent = false) => {
    if (editorRef.current && isImageLoaded) {
      editorRef.current.applyFilter(type, options, isSilent).then(result => {
        console.log('필터 적용 완료', result);
      }).catch(error => {
        console.error('필터 적용 실패:', error);
      });
    }
  };

  const handleFlip = (flipType) => {
    if (editorRef.current) {
      const flipMethod = flipType === 'X' ? editorRef.current.flipX : editorRef.current.flipY;
      flipMethod.call(editorRef.current)
        .then((status) => {
          console.log('flipX:', status.flipX);
          console.log('flipY:', status.flipY);
          console.log('angle:', status.angle);
        })
        .catch((message) => console.log('error:', message));
    }
  };

  const handleResetFlip = () => {
    if (editorRef.current) {
      editorRef.current.resetFlip().then(status => {
        console.log('flipX: ', status.flipX);
        console.log('flipY: ', status.flipY);
        console.log('angle: ', status.angle);
      }).catch(message => {
        console.log('error: ', message);
      });
    }
  };

  const handleRotate = (angle) => {
    if (editorRef.current) {
      editorRef.current.setAngle(angle, true).then((status) => {
        console.log('rotation 성공');
      }).catch((message) => {
        console.log('error: ', message);
      });
    }
  };

  const handleAddText = () => {
    if (editorRef.current) {
      editorRef.current.addText('Custom Text', {
        styles: {
          fill: '#000',
          fontSize: 30,
          fontWeight: 400,
          textAlign: 'left',
          textDecoration: 'none',
        },
        position: {
          x: 10,
          y: 10
        }
      }).then(objectProps => {
        console.log('텍스트 추가 성공 + ID: ', objectProps.id);
      }).catch(error => {
        console.error("텍스트 추가 실패:", error);
      });
    }
  };

  const handleChangeTextStyle = (styleObj) => {
    if (editorRef.current && selectedProps.type === "i-text") {
      editorRef.current.changeTextStyle(selectedProps.id, styleObj)
        .then(() => {
          console.log("selectedTextId: ", selectedProps.id);
          console.log('updatedStyles: ', styleObj);
          updateSelectedProps();
        })
        .catch(error => {
          console.error('텍스트 수정 실패:', error);
        });
    }
  };

  const startDrawingMode = (mode, options = {}) => {
    if (editorRef.current) {
      if (editorRef.current.getDrawingMode() !== 'NORMAL') {
        editorRef.current.stopDrawingMode();
      }
      editorRef.current.startDrawingMode(mode, options);
    }
  };

  const handleZoomChange = (newZoomLevel) => {
    if (editorRef.current) {
      editorRef.current.zoom({ x: 0.5, y: 0.5, zoomLevel: newZoomLevel });
      setZoomLevel(newZoomLevel);
    }
  };

  const handleUndo = () => {
    if (editorRef.current) {
      editorRef.current.undo().then(() => {
        console.log('Undo 성공');
      }).catch(error => {
        console.error('Undo 실패: ', error);
      });
    }
  };

  const handleRedo = () => {
    if (editorRef.current) {
      editorRef.current.redo().then(() => {
        console.log('Redo 성공');
      }).catch(error => {
        console.error('Redo 실패: ', error);
      });
    }
  };

  const handleReset = () => {
    if (editorRef.current && originalImageDataUrl) {
      editorRef.current.loadImageFromURL(originalImageDataUrl, 'Original Image').then(() => {
        console.log('Reset 성공');
        setIsCropMode(false); // Ensure crop mode is reset
      }).catch(error => {
        console.error('Reset 실패: ', error);
      });
    }
  };

  const handleDownloadImage = () => {
    if (editorRef.current && originalFileName) {
      const dataURL = editorRef.current.toDataURL({
        format: 'png',
        quality: 1
      });

      const fileName = originalFileName.replace(/\.[^/.]+$/, "") + "-edit.png";

      const link = document.createElement('a');
      link.href = dataURL;
      link.download = fileName;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  };

  const handleAddShape = (type, options) => {
    if (editorRef.current) {
      editorRef.current.addShape(type, options).then(objectProps => {
        console.log('도형추가 + ID:', objectProps.id);
      }).catch(error => {
        console.error('도형추가 실패:', error);
      });
    }
  };

  //Crop
  const handleCrop = async () => {
    if (editorRef.current) {
      setIsCropMode(true);
      try {
        const rect = await editorRef.current.getCropzoneRect();
        setCropRect(rect);
      } catch (error) {
        console.error('Crop 시작 실패:', error);
      }
    }
  };

  const applyCrop = async () => {
    if (editorRef.current && cropRect) {
      try {
        await editorRef.current.crop(cropRect);
        console.log('Crop 적용 성공');
        setIsCropMode(false);
      } catch (error) {
        console.error('Crop 적용 실패:', error);
      }
    }
  };

  const cancelCrop = async () => {
    if (editorRef.current) {
      try {
        await editorRef.current.loadImageFromURL(originalImageDataUrl, 'Original Image');
        setIsCropMode(false);
      } catch (error) {
        console.error('Crop 취소 실패:', error);
      }
    }
  };

  return (
    <div>
      <h1>Val's Editor</h1>
      <Container className="main">
        <div>
          <FilterControls onApplyFilter={applyFilter} />
          <FlipControls 
            onFlip={handleFlip} 
            onResetFlip={handleResetFlip} 
          />
          <RotateControls onRotate={handleRotate} />
          <DrawingModeControls onStartDrawingMode={startDrawingMode} />
          <AddTextControls 
            selectedProps={selectedProps}
            onAddText={handleAddText} 
            onChangeTextStyle={handleChangeTextStyle} 
          />
          <AddShapeControls onAddShape={handleAddShape} />
          <CropControls
            isCropMode={isCropMode}
            onApplyCrop={applyCrop}
            onCancelCrop={cancelCrop}
            onStartCrop={handleCrop}
          />
        </div>
        <div className="canvas-area">
          <div className="top-nav">
            <div className="top-nav-function-area">
              <div className="undo-redo">
                <button onClick={handleUndo}>
                  <FontAwesomeIcon icon={faRotateLeft} />
                </button>
                <button onClick={handleRedo}>
                  <FontAwesomeIcon icon={faRotateRight} />
                </button>
                <button onClick={handleReset}>Reset</button>
              </div>
              <ZoomControls onZoomChange={handleZoomChange} zoomLevel={zoomLevel} />
            </div>
            <div className="file-load-btn-area">
              <ImageUploader onFileChange={handleFileChange} />
              <button onClick={handleDownloadImage}>Download</button>
            </div>
          </div>
          <div className="canvas-background" id="tui-image-editor" ref={containerRef}></div>
        </div>
      </Container>
    </div>
  );
};

export default ImageEditorComponent;

