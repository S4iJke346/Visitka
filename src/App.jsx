import React from 'react';
import './App.css';
import './components/CardThemes.css';
import Sidebar from './components/sidebar';
import BusinessCard from './components/BusinessCard';
import domtoimage from 'dom-to-image';

function App() {
  const [formData, setFormData] = React.useState({
    name: '',
    email: '',
    phone: '',
    profession: '',
    photo: null
  });
  
  const [theme, setTheme] = React.useState('dark');
  const [format, setFormat] = React.useState('png');
  const [isGenerating, setIsGenerating] = React.useState(false);
  const cardRef = React.useRef(null);
  
  const handleInputChange = (e) => {
    const { name, value, files } = e.target;
    
    if (name === 'photo' && files && files[0]) {
      const file = files[0];
      const reader = new FileReader();
      reader.onload = (event) => {
        const img = new Image();
        img.onload = () => {
          const canvas = document.createElement('canvas');
          const MAX_WIDTH = 400;
          const MAX_HEIGHT = 400;
          let width = img.width;
          let height = img.height;
          
          if (width > height) {
            if (width > MAX_WIDTH) {
              height *= MAX_WIDTH / width;
              width = MAX_WIDTH;
            }
          } else {
            if (height > MAX_HEIGHT) {
              width *= MAX_HEIGHT / height;
              height = MAX_HEIGHT;
            }
          }
          
          canvas.width = width;
          canvas.height = height;
          const ctx = canvas.getContext('2d');
          ctx.drawImage(img, 0, 0, width, height);
          
          canvas.toBlob((blob) => {
            const optimizedFile = new File([blob], file.name, {
              type: file.type,
              lastModified: Date.now()
            });
            
            setFormData(prev => ({
              ...prev,
              photo: optimizedFile
            }));
          }, file.type, 0.7);
        };
        img.src = event.target.result;
      };
      reader.readAsDataURL(file);
    } else if (name !== 'photo') {
      setFormData(prev => ({
        ...prev,
        [name]: value
      }));
    }
  };
  
  const downloadCard = async () => {
    if (!cardRef.current) return;
    
    setIsGenerating(true);
    
    try {
        await document.fonts.ready;
        
        await new Promise(resolve => setTimeout(resolve, 100));
        
        if (format === 'png') {
            const dataUrl = await domtoimage.toPng(cardRef.current, {
                bgcolor: 'transparent',
                quality: 1.0
            });
            
            const link = document.createElement('a');
            link.download = 'visitka_business_card.png';
            link.href = dataUrl;
            link.click();
            
            setIsGenerating(false);
        } else {
            const dataUrl = await domtoimage.toPng(cardRef.current);
            
            import('jspdf').then(({ default: jsPDF }) => {
                const cardWidth = cardRef.current.offsetWidth;
                const cardHeight = cardRef.current.offsetHeight;
                const aspectRatio = cardWidth / cardHeight;
                
                const pdfWidth = 250;
                const pdfHeight = pdfWidth / aspectRatio;
                
                const pdf = new jsPDF({
                    orientation: cardWidth > cardHeight ? 'landscape' : 'portrait',
                    unit: 'mm',
                    format: [pdfWidth, pdfHeight]
                });
                
                pdf.addImage(dataUrl, 'PNG', 0, 0, pdfWidth, pdfHeight);
                pdf.save('visitka_business_card.pdf');
                
                setIsGenerating(false);
            });
        }
    } catch (err) {
        console.error('Error generating card:', err);
        setIsGenerating(false);
    }
};

  
  return (
    <div className="flex min-h-screen bg-gray-100">
      <div className="w-80 fixed left-0 top-0 h-full z-10" style={{left: '10px'}}>
        <Sidebar 
          formData={formData} 
          onChange={handleInputChange} 
          theme={theme} 
          setTheme={setTheme} 
        />
      </div>
      
      <main className="flex-1 flex flex-col min-h-screen ml-80">
        <div className="w-full pt-8 pb-4 px-8">
          <div className="text-center">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Создание визитной карточки</h1>
            <p className="text-gray-600">Заполните форму слева и получите персонализированную визитку</p>
          </div>
        </div>
        
        <div className="flex-grow flex justify-center items-center py-6">
          <div ref={cardRef} className="flex items-center justify-center" style={{ width: '720px', height: '350px' }}>
            <BusinessCard data={formData} theme={theme} />
          </div>
        </div>
        
        <div className="w-full py-8 px-8">
          <div className="flex flex-col items-center space-y-4">
            <div className="format-selector flex items-center bg-gray-50 rounded-lg p-1 mb-2">
              <button 
                className={`px-3 py-1 rounded-md text-sm transition-colors duration-200 ${format === 'png' ? 'chosen bg-gray-600 text-white font-medium' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'}`}
                onClick={() => setFormat('png')}
              >
                PNG
              </button>
              <button 
                className={`px-3 py-1 rounded-md text-sm transition-colors duration-200 ${format === 'pdf' ? 'chosen bg-gray-600 text-white font-medium' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'}`}
                onClick={() => setFormat('pdf')}
              >
                PDF
              </button>
            </div>
            
            <button
              onClick={downloadCard}
              disabled={isGenerating}
              className={`gen-button inline-flex items-center px-6 py-3 border-2 border-gray-500 text-base font-medium shadow-sm text-white cursor-pointer bg-gray-600 hover:bg-gray-700 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 transition-all duration-200 ${isGenerating ? 'opacity-70 cursor-not-allowed' : ''}`}
            >
              {isGenerating ? (
                <>
                  <svg className="animate-spin w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Создание...
                </>
              ) : (
                <>
                  <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                  </svg>
                  Сгенерировать визитку
                </>
              )}
            </button>
          </div>
        </div>
      </main>
    </div>
  );
}

export default App;