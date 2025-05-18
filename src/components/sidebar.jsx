import React, { useState, useRef, useEffect } from 'react';

export default function Sidebar({ formData, onChange, theme, setTheme }) {
  const [showThemeDropdown, setShowThemeDropdown] = useState(false);
  const dropdownRef = useRef(null);
  
  const themes = [
    { id: 'laz', name: 'Лазурная', color: 'bg-gradient-to-r from-blue-400 to-purple-500' },
    { id: 'dark', name: 'Тёмная', color: 'bg-gray-800' },
    { id: 'light', name: 'Светлая', color: 'bg-white' },
    { id: 'blue', name: 'Синяя', color: 'bg-gradient-to-r from-blue-500 to-blue-700' },
    { id: 'green', name: 'Зелёная', color: 'bg-gradient-to-r from-green-500 to-teal-500' },
    { id: 'red', name: 'Красная', color: 'bg-gradient-to-r from-red-500 to-pink-500' }
  ];

  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowThemeDropdown(false);
      }
    }
    
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [dropdownRef]);

  const currentTheme = themes.find(t => t.id === theme) || themes[0];

  return (
    <aside className="w-80 bg-white shadow-xl overflow-auto h-full border-r-2 border-l-2 border-gray-200">
      {/* Заголовок */}
      <div className="p-4 border-b border-gray-200">
        <h2 className="text-xl font-semibold text-gray-600 flex items-center">
          <svg className="w-4 h-4 mr-2" width="115" height="115" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"></path>
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path>
          </svg>
          Visitka 
        </h2>
      </div>

      {/* Форма */}
      <div className="p-4">
        <form className="space-y-4">
          <div>
            <label className="block mb-1 text-sm font-medium text-gray-700">Имя</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={onChange}
              placeholder="Иван Иванов"
              className="w-full border-2 border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-gray-400 focus:border-transparent"
            />
          </div>
          
          <div>
            <label className="block mb-1 text-sm font-medium text-gray-700">E-mail</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={onChange}
              placeholder="email@example.com"
              className="w-full border-2 border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-gray-400 focus:border-transparent"
            />
          </div>
          
          <div>
            <label className="block mb-1 text-sm font-medium text-gray-700">Номер телефона</label>
            <input
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={onChange}
              placeholder="+7 999 123-45-67"
              className="w-full border-2 border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-gray-400 focus:border-transparent"
            />
          </div>
          
          <div>
            <label className="block mb-1 text-sm font-medium text-gray-700">Род деятельности</label>
            <input
              type="text"
              name="profession"
              value={formData.profession}
              onChange={onChange}
              placeholder="Менеджер проектов"
              className="w-full border-2 border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-gray-400 focus:border-transparent"
            />
          </div>
          
          <div>
            <label className="block mb-1 text-sm font-medium text-gray-700">Фото</label>
            <div className="flex items-center justify-center w-full">
              <label className="theme-button flex flex-col items-center justify-center w-full h-24 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50">
                <div className="flex flex-col items-center justify-center pt-3 pb-4">
                  <svg className="w-5 h-5 mb-2 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"></path>
                  </svg>
                  <p className="text-xs text-gray-500">
                    <span className="font-semibold">Нажмите для загрузки</span>
                  </p>
                </div>
                <input 
                  type="file" 
                  name="photo" 
                  accept="image/*" 
                  onChange={onChange} 
                  className="hidden" 
                />
              </label>
            </div>
            {formData.photo && (
              <div className="mt-1 text-xs text-green-600">
                Файл выбран: {formData.photo.name}
              </div>
            )}
          </div>
          
          <div className="relative" ref={dropdownRef}>
            <label className="block mb-1 text-sm font-medium text-gray-700">Тема визитки</label>
            <button
              type="button"
              className="theme-button w-full flex items-center justify-between border-2 border-gray-300 rounded-lg px-3 py-2 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-gray-400 focus:border-transparent"
              onClick={() => setShowThemeDropdown(!showThemeDropdown)}
              style={{ minWidth: '100%', height: "120px"}}
            >
              <div className="flex items-center">
                <div className={`w-5 h-5 rounded mr-2 ${currentTheme.color}`}></div>
                <span>{currentTheme.name}</span>
              </div>
              <svg className="w-4 h-4 text-gray-400" width="50" height="50" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
              </svg>
            </button>
            
            {showThemeDropdown && (
              <div className="absolute z-10 mt-1 w-full bg-white border-2 border-gray-200 rounded-md shadow-lg py-1 max-h-60 overflow-auto">
                {themes.map(th => (
                  <button
                    key={th.id}
                    type="button"
                    className={`theme-button w-full flex items-center px-3 py-2 hover:bg-gray-100 ${theme === th.id ? 'bg-gray-50 text-gray-700' : ''}`}
                    onClick={() => {
                      setTheme(th.id);
                      setShowThemeDropdown(false);
                    }}
                  >
                    <div className={`w-5 h-5 rounded mr-2 ${th.color}`}></div>
                    <span>{th.name}</span>
                  </button>
                ))}
              </div>
            )}
          </div>
        </form>
      </div>
    </aside>
  );
}