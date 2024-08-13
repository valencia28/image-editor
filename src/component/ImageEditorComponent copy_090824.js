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

const ImageEditorComponent = () => {
  const containerRef = useRef(null);
  const editorRef = useRef(null);
  const [isImageLoaded, setIsImageLoaded] = useState(false);
  const [file, setFile] = useState(null);
  const [selectedTextId, setSelectedTextId] = useState(null);
  const [selectedTextStyles, setSelectedTextStyles] = useState({});
  const [zoomLevel, setZoomLevel] = useState(1.0);

  useEffect(() => {
    if (containerRef.current) {
      editorRef.current = new ImageEditor(containerRef.current, {
        cssMaxWidth: 700,
        cssMaxHeight: 500,
        selectionStyle: {
          cornerSize: 20,
          rotatingPointOffset: 70
        }
      });

      /*
      editorRef.current.on('selectObject', (object) => {
        if (object && object.type === 'text') {
          setSelectedTextId(object.id);
          setSelectedTextStyles(object.styles);
        } else {
          setSelectedTextId(null);
          setSelectedTextStyles({});
        }
      });

      editorRef.current.on('addText', (pos) => {
        console.log('Text added at position:', pos);
      });*/
    }
  }, []);

  const handleFileChange = (event) => {
    const selectedFile = event.target.files[0];
    if (selectedFile) {
      setFile(selectedFile);
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
    if (editorRef.current) {
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

  const handleRotate = (angle) => {
    if (editorRef.current) {
      editorRef.current.setAngle(angle, true).then((status) => {
        console.log('angle: ', status.angle);
      }).catch((message) => {
        console.log('error: ', message);
      });
    }
  };

  const handleAddText = ({ fontSize, fontWeight, fontColor, textAlign }) => {
    if (editorRef.current) {
      editorRef.current.addText('Custom Text', {
        styles: {
          fill: fontColor,
          fontSize: parseInt(fontSize, 10),
          fontWeight: fontWeight,
          textAlign: textAlign
        },
        position: {
          x: 10,
          y: 10
        }
      }).then(objectProps => {
        console.log('Text added with ID:', objectProps.id);
        setSelectedTextId(objectProps.id);
        setSelectedTextStyles({
          fill: fontColor,
          fontSize: parseInt(fontSize, 10),
          fontWeight: fontWeight,
          textAlign: textAlign
        });
      }).catch(error => {
        console.error("텍스트 추가 실패:", error);
      });
    }
  };

  const handleChangeTextStyle = (styleObj) => {
    if (editorRef.current && selectedTextId) {
      const updatedStyles = {
        ...selectedTextStyles,
        ...styleObj
      };

      editorRef.current.changeTextStyle(selectedTextId, updatedStyles)
        .then(() => {
          console.log("selectedTextId: ", selectedTextId);
          console.log('updatedStyles: ', updatedStyles);
          setSelectedTextStyles(updatedStyles);
        })
        .catch(error => {
          console.error('텍스트 스타일 변경 실패:', error);
        });
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
        console.log('Undo action completed.');
      }).catch(error => {
        console.error('Undo action failed:', error);
      });
    }
  };

  const handleRedo = () => {
    if (editorRef.current) {
      editorRef.current.redo().then(() => {
        console.log('Redo action completed.');
      }).catch(error => {
        console.error('Redo action failed:', error);
      });
    }
  };

  return (
    <div className="test2">
      <div className="test" id="tui-image-editor" ref={containerRef} style={{ width: '1000px', height: '700px' }}></div>
      <ImageUploader onFileChange={handleFileChange} />
      <FilterControls onApplyFilter={applyFilter} />
      <FlipControls onFlip={handleFlip} />
      <RotateControls onRotate={handleRotate} />
      <AddTextControls 
        onAddText={handleAddText} 
        onChangeTextStyle={handleChangeTextStyle} 
        selectedTextId={selectedTextId}
      />
      <button onClick={handleUndo}>Undo</button>
      <button onClick={handleRedo}>Redo</button>
      <ZoomControls onZoomChange={handleZoomChange} zoomLevel={zoomLevel} />
    </div>
  );
};

//export default ImageEditorComponent;



