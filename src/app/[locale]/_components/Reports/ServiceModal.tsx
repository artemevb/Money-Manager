// components/modals/ServiceModal.tsx
import React, { useState } from "react";

interface ServiceModalProps {
  isOpen: boolean;
  onClose: () => void;
  onApply: (selectedServices: string[]) => void;
}

const services = [
  "Разработка сайта",
  "Разработка Telegram ботов",
  "Реклама",
];

const ServiceModal: React.FC<ServiceModalProps> = ({
  isOpen,
  onClose,
  onApply,
}) => {
  const [selectedServices, setSelectedServices] = useState<string[]>([]);

  if (!isOpen) return null;

  const handleBackdropClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) onClose();
  };

  const toggleService = (service: string) => {
    setSelectedServices((prev) =>
      prev.includes(service)
        ? prev.filter((s) => s !== service)
        : [...prev, service]
    );
  };

  const handleApply = () => {
    onApply(selectedServices);
    onClose();
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50"
      onClick={handleBackdropClick}
    >
      <div className="bg-white p-6 rounded w-11/12 max-w-sm">
        <h2 className="text-lg font-semibold mb-2">Услуги</h2>
        <div className="flex flex-col space-y-2 mb-4 max-h-64 overflow-auto">
          {services.map((service) => (
            <label key={service} className="flex items-center space-x-2">
              <input
                type="checkbox"
                value={service}
                checked={selectedServices.includes(service)}
                onChange={() => toggleService(service)}
              />
              <span>{service}</span>
            </label>
          ))}
        </div>
        <button
          onClick={handleApply}
          className="bg-violet-600 text-white px-4 py-2 rounded"
        >
          Применить
        </button>
      </div>
    </div>
  );
};

export default ServiceModal;
