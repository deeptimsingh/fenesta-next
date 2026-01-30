# Dark Mode Debugging Guide

## Step-by-Step Troubleshooting

### Step 1: Verify ThemeProvider is Working
1. Open browser DevTools (F12)
2. Go to Console tab
3. Type: `document.documentElement.classList`
4. Click the theme toggle button
5. Check if `dark` class is added/removed from the HTML element

### Step 2: Check localStorage
1. Open DevTools → Application → Local Storage
2. Look for `theme` key
3. Should be `"dark"` or `"light"`

### Step 3: Verify Tailwind Config
- Check `tailwind.config.ts` has `darkMode: "class"` ✅

### Step 4: Test Dark Mode Manually
1. Open DevTools Console
2. Run: `document.documentElement.classList.add('dark')`
3. Check if dark mode styles apply
4. If yes, the issue is with ThemeToggle
5. If no, the issue is with CSS/Tailwind

### Step 5: Check for CSS Conflicts
- Make sure no other CSS is overriding dark mode styles
- Check if `!important` is needed anywhere

### Step 6: Clear Cache
1. Clear browser cache
2. Hard refresh (Ctrl+Shift+R or Cmd+Shift+R)
3. Restart dev server

## Common Issues:

### Issue 1: Dark class not being added
**Solution:** Check ThemeToggle component and ThemeProvider setup

### Issue 2: Dark styles not applying
**Solution:** Verify Tailwind config and CSS specificity

### Issue 3: Flash of wrong theme
**Solution:** Already handled with `suppressHydrationWarning`

### Issue 4: CSS variables not working
**Solution:** Use `var()` wrapper or direct color values
