import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import '../css/progressbar.css';

// Full list of steps
const allSteps = [
  'Departure',
  'Destination',
  'Passengers',
  'Travel Date',
  'Choose Route',
  'Cabin',
  'Meal Package',
  'Passenger Details',
  'Summary',
  'Payment Option',
  'Payment',
];

// Mobile condensed steps - key milestone steps to show on mobile
const mobileSteps = ['Departure', 'Passengers', 'Cabin', 'Summary', 'Payment'];

// Helper function to map current step index to mobile step index
const mapToMobileIndex = (currentIndex) => {
  // Find the nearest mobile step that is less than or equal to current step
  const currentStep = allSteps[currentIndex];

  // If the current step is in mobileSteps, return its index
  const mobileIndex = mobileSteps.indexOf(currentStep);
  if (mobileIndex !== -1) return mobileIndex;

  // Otherwise find the nearest mobile step that comes before current step
  let nearestIndex = 0;
  for (let i = 0; i < mobileSteps.length; i++) {
    const mobileStepIndex = allSteps.indexOf(mobileSteps[i]);
    if (mobileStepIndex <= currentIndex) {
      nearestIndex = i;
    } else {
      break;
    }
  }

  return nearestIndex;
};

const ProgressBar = ({ activeStep }) => {
  const [isSmallScreen, setIsSmallScreen] = useState(window.innerWidth <= 900);
  const [isVerySmallScreen, setIsVerySmallScreen] = useState(window.innerWidth <= 600);
  const [isShortScreen, setIsShortScreen] = useState(window.innerHeight <= 500);
  const navigate = useNavigate();

  useEffect(() => {
    const handleResize = () => {
      setIsSmallScreen(window.innerWidth <= 900);
      setIsVerySmallScreen(window.innerWidth <= 600);
      setIsShortScreen(window.innerHeight <= 500);

      const windowHeight = window.innerHeight;
      const navbarHeight = Math.max(windowHeight * 0.07, 3.7 * 16);

      let navbarOffset;
      if (windowHeight >= 730) {
        navbarOffset = 16;
      } else {
        const factor = (730 - windowHeight) / (730 - 350);
        navbarOffset = 16 + factor * 16;
      }

      document.documentElement.style.setProperty('--navbar-height', `${navbarHeight}px`);
      document.documentElement.style.setProperty('--navbar-offset', `${navbarOffset}px`);
    };

    window.addEventListener('resize', handleResize);
    handleResize();

    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const handleStepClick = (index, isMobile = false) => {
    // Get the appropriate step index to navigate to
    const targetIndex = isMobile ? allSteps.indexOf(mobileSteps[index]) : index;

    // Only allow navigation to completed or current steps
    if (targetIndex <= activeStep) {
      // Convert step name to route (e.g., "Travel Date" → "/travel-date")
      const route = `/${allSteps[targetIndex].replace(/\s+/g, '').toLowerCase()}`;
      navigate(route);
    }
  };

  // Determine if we should use vertical layout based on screen height
  const useVerticalLayout = isShortScreen;

  // Determine which steps array to use based on screen size or layout
  // Always use mobile steps when in vertical layout
  const stepsToRender = isVerySmallScreen || useVerticalLayout ? mobileSteps : allSteps;

  // Map the active step to the correct index in the condensed array if on mobile or vertical layout
  const displayActiveStep =
    isVerySmallScreen || useVerticalLayout ? mapToMobileIndex(activeStep) : activeStep;

  return (
    <div
      className={`progress-container 
                    ${isVerySmallScreen ? 'mobile-view' : ''} 
                    ${useVerticalLayout ? 'vertical' : ''}`}
    >
      {stepsToRender.map((step, index) => {
        // For mobile view, we need to calculate if this step should be marked as completed
        const stepInFullArray = allSteps.indexOf(step);
        const isCompleted = isVerySmallScreen ? stepInFullArray < activeStep : index < activeStep;

        // For mobile view, we need a special active check
        const isActive = isVerySmallScreen
          ? stepInFullArray === activeStep ||
            (index === displayActiveStep && stepInFullArray > activeStep)
          : index === activeStep;

        return (
          <React.Fragment key={index}>
            <div
              className={`progress-button-wrapper ${
                isActive ? 'active' : isCompleted ? 'completed' : ''
              }`}
              onClick={() => handleStepClick(index, isVerySmallScreen)}
            >
              <img
                src={`./src/assets/progress-bar/${step.replace(/\s+/g, '')}${isCompleted ? '-completed' : ''}.svg`}
                className="progress-icon"
                alt={step}
              />
            </div>
            {index < stepsToRender.length - 1 && (
              <div
                className={`progress-line ${
                  isVerySmallScreen
                    ? index < displayActiveStep
                      ? 'completed'
                      : index === displayActiveStep
                        ? 'active'
                        : ''
                    : index < activeStep - 1
                      ? 'completed'
                      : index === activeStep - 1
                        ? 'active'
                        : ''
                }`}
              />
            )}
          </React.Fragment>
        );
      })}
    </div>
  );
};

export default ProgressBar;
