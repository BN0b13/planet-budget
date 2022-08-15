// Styling
const theme = {
    primary: {
        color: '#F7FFF6',
        bg: '#87D68D',
        border: '#93B48B',
        background: '#f3f3f3',
        text: '#000'
    },
    secondary: {
        color: '#F7FFF6',
        bg: '#BCEBCB',
        border: '#87D68D'
    },
    dark: {
        color: '#F7FFF6',
        bg: '#8491A3',
        border: '#93B48B',
        background: '#333',
        text: '#f3f3f3'
    },
    alert: {
        success: 'green',
        danger: 'red',
        disabled: 'grey'
    }
}

export const customReactTheme = (darkMode) => {
    let currentPrimaryTheme = theme.primary;
    let currentSecondaryTheme = theme.secondary;
    if(darkMode) { currentPrimaryTheme = theme.dark }

    return`
        .btn-primary {
          --bs-btn-color: ${currentPrimaryTheme.color};
          --bs-btn-bg: ${currentPrimaryTheme.bg};
          --bs-btn-border-color: ${currentPrimaryTheme.border};
          --bs-btn-hover-color: ${currentSecondaryTheme.color};
          --bs-btn-hover-bg: ${currentSecondaryTheme.bg};
          --bs-btn-hover-border-color: ${currentSecondaryTheme.border};
          --bs-btn-focus-shadow-rgb: ${currentPrimaryTheme.border};
          --bs-btn-active-color: ${currentPrimaryTheme.color};
          --bs-btn-active-bg: ${currentPrimaryTheme.bg};
          --bs-btn-active-border-color: ${currentPrimaryTheme.border};
          --bs-btn-active-shadow: inset 0 3px 5px rgba(0, 0, 0, 0.125);
          --bs-btn-disabled-color: ${currentPrimaryTheme.color};
          --bs-btn-disabled-bg: ${theme.alert.disabled};
          --bs-btn-disabled-border-color: ${currentPrimaryTheme.color};
        }
        body {
            color: ${currentPrimaryTheme.text} !important;
            background-color: ${currentPrimaryTheme.background} !important;
        }
        .header {
            border-bottom: 1px solid ${currentPrimaryTheme.border} !important;
        }
        .nav-link {
            color: ${currentPrimaryTheme.text} !important;
        }
        .nav-link:hover {
            border: 1px solid ${currentPrimaryTheme.border} !important;
            border-radius: 5px !important;
        }
      ` 
}
