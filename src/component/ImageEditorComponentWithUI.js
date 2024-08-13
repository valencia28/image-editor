import React, { useRef, useState, useEffect } from 'react';
import 'tui-image-editor/dist/tui-image-editor.css'; // 기본 스타일을 가져옵니다
import ImageEditor from 'tui-image-editor';

const ImageEditorComponentWithUI = () => {
  const containerRef = useRef(null);
  const editorRef = useRef(null); // ImageEditor 인스턴스 참조
  const [isImageLoaded, setIsImageLoaded] = useState(false); // 이미지 로드 상태
  const [isCropzoneReady, setIsCropzoneReady] = useState(false); // 크롭존 준비 상태
  const [maskObjId, setMaskObjId] = useState(null); // 마스크 객체 ID 상태

  const myTheme = {
    'menu.background': '#ffffff' // 메뉴 배경색을 흰색으로 설정
  };

  useEffect(() => {
    if (containerRef.current) {
      // ImageEditor 인스턴스 생성
      editorRef.current = new ImageEditor(containerRef.current, {
        /*
        includeUI: {
          theme: myTheme,
          menu: ['shape', 'filter'],
          initMenu: 'filter',
          uiSize: {
            width: '1000px',
            height: '700px'
          },
          menuBarPosition: 'bottom'
        },*/
        cssMaxWidth: 700,
        cssMaxHeight: 500,
        selectionStyle: {
          cornerSize: 20,
          rotatingPointOffset: 70
        }
      });

      // 이미지 로드
      editorRef.current.loadImageFromURL('logo192.png', 'My sample image').then(() => {
        console.log("이미지 로드 완료");
        setIsImageLoaded(true);

        // 마스크 객체 추가 및 ID 저장 (예시)
        editorRef.current.addImageObject('path/to/mask/image.png').then(objectProps => {
          setMaskObjId(objectProps.id);
        }).catch(error => {
          console.error("마스크 객체 추가 실패:", error);
        });

        // 크롭존이 설정될 때까지 대기
        const checkCropzoneReady = () => {
          if (editorRef.current) {
            const cropzoneRect = editorRef.current.getCropzoneRect();
            if (cropzoneRect) {
              setIsCropzoneReady(true);
            } else {
              setTimeout(checkCropzoneReady, 500); // 크롭존이 준비되지 않았으면 재확인
            }
          }
        };
        checkCropzoneReady();
      }).catch((error) => {
        console.error("이미지 로드 실패:", error);
      });
    }
  }, []);

  // 필터 적용 핸들러
  const applyFilter = () => {
    if (editorRef.current) {
      editorRef.current.applyFilter('Grayscale').then(() => {
        console.log('그레이스케일 필터 적용 완료');
      }).catch(message => {
        console.log('필터 적용 실패:', message);
      });

      if (maskObjId) {
        editorRef.current.applyFilter('mask', { maskObjId }).then(obj => {
          console.log('filterType: ', obj.type);
          console.log('actType: ', obj.action);
        }).catch(message => {
          console.log('error: ', message);
        });
      }
    } else {
      console.log("ImageEditor 인스턴스가 준비되지 않았습니다.");
    }
  };

  // 크롭 버튼 클릭 핸들러
  const handleCrop = () => {
    if (editorRef.current && isImageLoaded && isCropzoneReady) {
      const cropzoneRect = editorRef.current.getCropzoneRect();
      if (cropzoneRect) {
        editorRef.current.crop(cropzoneRect).then(() => {
          console.log("이미지 크롭 완료");
        }).catch((error) => {
          console.error("이미지 크롭 실패:", error);
        });
      } else {
        console.warn("크롭존이 준비되지 않았습니다.");
      }
    } else {
      console.warn("이미지 로드가 완료되지 않았거나 크롭존이 준비되지 않았습니다.");
    }
  };

  return (
    <div>
      <div className="test" id="tui-image-editor" ref={containerRef} style={{ width: '1000px', height: '700px' }}></div>
      <button onClick={handleCrop}>Crop</button>
      <button onClick={applyFilter}>Filter</button>
    </div>
  );
};

export default ImageEditorComponentWithUI;