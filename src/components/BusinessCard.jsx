import React from 'react';
import './CardThemes.css';

export default function BusinessCard({ data, theme }) {
  const { name, email, phone, profession, photo } = data;
  
  const getThemeClassName = () => {
    return `card-theme-${theme || 'default'}`;
  };

  return (
    <div className={`business-card ${getThemeClassName()}`}>
      <div className="business-card-content">
        {/* Имя */}
        <div className="business-card-name">
          {name || 'Иван Иванов'}
        </div>
        
        {/* Проф */}
        <div className="business-card-profession">
          {profession || 'Менеджер проектов'}
        </div>
        
        <div className="business-card-contacts">
          {/* Почта */}
          <div className="business-card-contact-item">
            <div className="business-card-icon">
              <svg fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path>
              </svg>
            </div>
            <span>{email || 'email@example.com'}</span>
          </div>
          
          {/* Тел */}
          <div className="business-card-contact-item">
            <div className="business-card-icon">
              <svg fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"></path>
              </svg>
            </div>
            <span>{phone || '+7 999 123-45-67'}</span>
          </div>
        </div>
      </div>
      
      <div className="business-card-photo-container">
        {photo ? (
          <>
            <img
              src={URL.createObjectURL(photo)}
              alt="Фото"
              className="business-card-photo"
              crossOrigin="anonymous"
            />
            <div className="business-card-photo-overlay"></div>
          </>
        ) : (
          <div className="business-card-photo-placeholder">
            <svg className="business-card-photo-placeholder-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path>
            </svg>
          </div>
        )}
      </div>
    </div>
  );
}