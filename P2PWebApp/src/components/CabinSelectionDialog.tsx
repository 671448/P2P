import { useEffect, useState } from 'react';
import ReusableDialog from './ReusableDialog';
import '../css/Cabins.css';
import '../css/ApplyCancelButtons.css';

interface CabinType {
  type: 'Flex' | 'Saver';
  price: number;
}

interface CabinCategory {
  id: number;
  name: string;
  imagePath: string;
  description: string;
  options: CabinType[];
}

interface SelectedCabin {
  category: string;
  cabin: CabinType;
}

interface CabinSelectionDialogProps {
  onCabinSelected: (selected: boolean) => void;
}

export default function CabinSelectionDialog({ onCabinSelected }: CabinSelectionDialogProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [cabinCategories, setCabinCategories] = useState<CabinCategory[]>([]);
  const [selectedCabin, setSelectedCabin] = useState<SelectedCabin | null>(null);
  const [openPanel, setOpenPanel] = useState<string | null>(null);
  const [closingPanel, setClosingPanel] = useState<string | null>(null);

  useEffect(() => {
    fetch('http://localhost:5215/api/cabins')
      .then((res) => res.json())
      .then((data) => setCabinCategories(data))
      .catch((err) => console.error('Failed to fetch cabins:', err));
  }, []);

  const handleApply = () => {
    if (selectedCabin) {
      sessionStorage.setItem('selectedCabin', JSON.stringify(selectedCabin));
      onCabinSelected(true);
      setIsOpen(false);
    }
  };

  const getDisplayText = () => {
    if (!selectedCabin) return 'Select your cabin';
    return `${selectedCabin.category} — ${selectedCabin.cabin.type}`;
  };

  const isCabinSelectionComplete = selectedCabin !== null;

  const handleCabinSelect = (categoryName: string, cabin: CabinType) => {
    setSelectedCabin({ category: categoryName, cabin });
    sessionStorage.setItem('selectedCabin', JSON.stringify({ category: categoryName, cabin }));
    onCabinSelected(true);
  };

  const handleTogglePanel = (categoryName: string) => {
    if (openPanel === categoryName) {
      setClosingPanel(categoryName);
      setTimeout(() => {
        setOpenPanel(null);
        setClosingPanel(null);
      }, 300);
    } else {
      setOpenPanel(categoryName);
      setClosingPanel(null);
    }
  };

  return (
    <div className="custom-cabin-dialog">
      <div className="custom-cabin-dialog-toggle" onClick={() => setIsOpen(true)}>
        <p>{getDisplayText()}</p>
      </div>
      <ReusableDialog
        className="custom-cabin-dialog-open"
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
      >
        <div className="custom-cabin-dialog-content">
          <div className="cabin-options-list">
            {cabinCategories.map((category) => (
              <div key={category.id} className="cabin-option-wrapper">
                <div className="cabin-category-container">
                  <div className="cabin-image-container">
                    <div
                      className="title-with-icon"
                      onClick={() => handleTogglePanel(category.name)}
                    >
                      <h3 className="route-title">{category.name}</h3>
                      <span className="info-icon">
                        <img src="./src/assets/info.svg" alt="Info" />
                      </span>
                    </div>
                    <div className="cabin-image">
                      <img src={category.imagePath} alt={`${category.name} Cabin`} />
                    </div>
                  </div>
                  <div className="cabin-options">
                    {category.options.map((cabin) => {
                      const isSelected =
                        selectedCabin?.category === category.name &&
                        selectedCabin?.cabin.type === cabin.type;

                      return (
                        <div
                          key={`${category.name}-${cabin.type}`}
                          className={`cabin-option ${isSelected ? 'cabin-option-selected' : ''}`}
                          onClick={() => handleCabinSelect(category.name, cabin)}
                        >
                          <div className="cabin-option-details">
                            <span>{cabin.type}</span>
                            <span>NOK {cabin.price}</span>
                          </div>
                          <div
                            className={`cabin-selector ${isSelected ? 'cabin-selector-selected' : ''}`}
                          ></div>
                        </div>
                      );
                    })}
                  </div>

                  {(openPanel === category.name || closingPanel === category.name) && (
                    <div
                      className={`row-panel ${closingPanel === category.name ? 'closing' : 'opening'}`}
                    >
                      <div className="row-panel-header">
                        <h4>{category.name}</h4>
                        <span
                          className="close-icon"
                          onClick={() => handleTogglePanel(category.name)}
                        >
                          ✕
                        </span>
                      </div>
                      <div className="row-panel-content">
                        <p>{category.description}</p>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>

          <div className="apply-cancel">
            <button className="cancel" onClick={() => setIsOpen(false)}>
              Cancel
            </button>
            <button className="apply" onClick={handleApply} disabled={!isCabinSelectionComplete}>
              Apply
            </button>
          </div>
        </div>
      </ReusableDialog>
    </div>
  );
}
