# Design Guidelines: Premium Christmas Tree Sales Bonus Calculator

## Design Approach: Material Design System
**Justification:** This is a data-intensive productivity application requiring clear information hierarchy, professional aesthetics, and efficient data entry workflows. Material Design provides robust patterns for forms, tables, progress indicators, and color-coded status systems.

**Core Principles:**
- Clarity over decoration - every element serves a functional purpose
- Immediate visual feedback for plan achievement status
- Efficient data entry workflow for daily sales input
- Professional business application aesthetic

## Color Palette

**Light Mode:**
- Background: 0 0% 98%
- Surface: 0 0% 100%
- Primary: 210 100% 45% (professional blue)
- Success (Plan Met): 142 76% 36% (green for ≥100% plan achievement)
- Warning: 38 92% 50% (amber for 80-99% achievement)
- Danger (Below Plan): 0 84% 60% (red for <80% achievement)
- Text Primary: 220 13% 18%
- Text Secondary: 220 9% 46%

**Dark Mode:**
- Background: 220 13% 10%
- Surface: 220 13% 14%
- Primary: 210 100% 60%
- Success: 142 70% 45%
- Warning: 38 90% 60%
- Danger: 0 84% 65%
- Text Primary: 210 17% 98%
- Text Secondary: 217 11% 65%

## Typography

**Font Family:** 
- Primary: 'Inter', system-ui, sans-serif (via Google Fonts CDN)
- Numeric: 'Roboto Mono', monospace (for financial figures)

**Type Scale:**
- Page Title: text-3xl font-bold (36px)
- Section Headers: text-xl font-semibold (20px)
- Card Titles: text-lg font-medium (18px)
- Body Text: text-base (16px)
- Labels: text-sm font-medium (14px)
- Financial Figures: text-lg font-mono font-semibold
- Small Metadata: text-xs text-secondary (12px)

## Layout System

**Spacing Primitives:** Consistently use Tailwind units of **2, 4, 6, 8, 12, 16** (e.g., p-4, gap-6, mb-8)

**Container Structure:**
- Max width: max-w-7xl mx-auto
- Page padding: px-4 md:px-6 lg:px-8
- Section spacing: space-y-8
- Card padding: p-6
- Form field spacing: gap-4

**Grid System:**
- Dashboard stats: grid-cols-1 md:grid-cols-2 lg:grid-cols-4
- Form sections: Two-column layout on desktop, single column mobile
- Data tables: Full-width with horizontal scroll on mobile

## Component Library

### 1. Dashboard Header
- Month selector (dropdown): October/November/December
- Large plan targets display with progress rings
- Current achievement percentage with color-coded background

### 2. Progress Cards (Plan Achievement Indicators)
- **Trees Card:** Shows plan (e.g., 1,300,000₽), actual sales, percentage
- **Accessories Card:** Shows plan (e.g., 100,000₽), actual sales, percentage
- Color-coded background: Green (≥100%), Amber (80-99%), Red (<80%)
- Large percentage number (text-4xl) with trend indicator
- Linear progress bar at bottom of card

### 3. Daily Sales Entry Form
- Date picker (defaults to today)
- **Trees Section:** Single input for total daily tree sales (₽)
- **Accessories Section:** Single input for total daily accessory sales (₽)
- Large, prominent "Add Sales" button (bg-primary)
- Confirmation message on successful entry

### 4. Salary Calculation Display
- Prominent card showing calculated salary breakdown:
  - Trees commission (3% of sales)
  - Accessories commission (5% of sales)
  - Bonus (1% when plan met) - shown conditionally
  - **Total Salary** (large, emphasized with primary color)
- Use tabular layout for clarity with right-aligned numbers

### 5. Sales History Table
- Columns: Date | Trees (₽) | Accessories (₽) | Daily Total
- Alternating row backgrounds for readability
- Totals row at bottom (font-semibold, border-top-2)
- Edit/Delete actions for each row
- Responsive: card-based layout on mobile

### 6. Navigation
- Top bar with logo/company name
- Month selector prominently displayed
- Minimal navigation - single-page dashboard focus

### 7. Form Inputs
- Material-style outlined inputs
- Label above input field
- Numeric inputs with ₽ suffix
- Clear focus states (ring-2 ring-primary)
- Error states with red border and helper text

### 8. Buttons
- Primary: bg-primary text-white px-6 py-3 rounded-lg font-medium
- Secondary: border-2 border-primary text-primary bg-transparent
- Icon buttons: Circular, ghost style for table actions
- Disabled state: opacity-50 cursor-not-allowed

## Animations

**Minimal, purposeful animations:**
- Progress bar fill: Smooth transition (transition-all duration-500)
- Color changes: Fade between red/amber/green states (transition-colors duration-300)
- Card hover: Subtle lift effect (hover:shadow-lg transition-shadow)
- Form submission: Brief success checkmark animation
- **No decorative or distracting animations**

## Data Visualization

**Progress Indicators:**
- Circular progress rings for overall monthly achievement (using SVG)
- Linear progress bars within cards
- Color transitions at 80% and 100% thresholds

**Number Formatting:**
- All currency: 1,300,000₽ (comma separators, ₽ symbol)
- Percentages: 95.5% (one decimal place)
- Use font-mono for all numeric displays to maintain alignment

## Mobile Responsiveness

- Stack dashboard cards vertically on mobile
- Full-width form inputs with larger touch targets (min-height: 48px)
- Sticky month selector at top
- Collapsible table to card-based layout
- Bottom-fixed "Add Sales" button on mobile for quick access

## Visual Hierarchy

1. **Primary Focus:** Month selector and plan achievement cards (largest, most colorful)
2. **Secondary:** Salary calculation display (prominent but below plan status)
3. **Tertiary:** Daily entry form (functional, clean, not decorative)
4. **Supporting:** Sales history table (detailed, scrollable)

## Professional Business Aesthetic

- Clean, uncluttered layouts with generous whitespace
- Professional color palette avoiding playful or trendy elements
- Trustworthy, corporate feel suitable for internal business tool
- Focus on readability and data clarity over visual flair
- Consistent use of shadows for depth (shadow-sm for cards, shadow-md for modals)