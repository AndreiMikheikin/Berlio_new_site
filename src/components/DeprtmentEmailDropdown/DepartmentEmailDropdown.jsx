
import React, { useState, useRef, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import departments from '../../data/departmentAdresses.json';
import '../../styles/components/DepartmentEmailDropdown.scss';

export default function DepartmentEmailDropdown() {
  const { t } = useTranslation();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    function handleClick(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    }

    function handleKeyDown(event) {
      if (event.key === 'Escape') {
        setIsOpen(false);
      }
    }

    document.addEventListener('mousedown', handleClick);
    document.addEventListener('keydown', handleKeyDown);

    return () => {
      document.removeEventListener('mousedown', handleClick);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  return (
    <span className="aam_department-dropdown" ref={dropdownRef}>
      <button
        type="button"
        className="aam_department-dropdown__toggle"
        onClick={() => setIsOpen((prev) => !prev)}
      >
        {t('selectDepartment')}
      </button>

      {isOpen && (
        <ul className="aam_department-dropdown__list">
          {departments.map((dep) => (
            <li key={dep.id} className="aam_department-dropdown__item">
              <a
                href={`mailto:${dep.email[1]}`}
                className="aam_department-dropdown__link"
                onClick={() => setIsOpen(false)} // закрываем при выборе
              >
                {t(dep.departmentsName)} — {dep.email[1]}
              </a>
            </li>
          ))}
        </ul>
      )}
    </span>
  );
}
