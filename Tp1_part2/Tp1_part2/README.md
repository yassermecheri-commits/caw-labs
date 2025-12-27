# 🧠 Selectors Exercise: AI in Web Design

## 🔍 Observation and Result

When observing the rendered webpage, you’ll notice that:

- The `<h1>` inside the `<footer>` appears **smaller** than the main `<h1>` in the header.  
- This happens because of the two conflicting CSS rules:

```css
footer h1 {
  font-size: 1.2em;
}

h1 {
  font-size: 2em;
}
```

Even though both rules apply to `<h1>` elements, **`footer h1`** takes precedence for `<h1>` elements that are *inside a `<footer>`*.

---

## ⚙️ Explanation: CSS Specificity

**CSS specificity** is a ranking system used by browsers to determine which style declarations are applied when multiple rules target the same element.

Each selector type has a different **specificity weight**:

| Selector Type | Example | Specificity Value |
|----------------|----------|------------------|
| Inline styles | `<h1 style="...">` | (1, 0, 0, 0) |
| ID selectors | `#special` | (0, 1, 0, 0) |
| Class, pseudo-class, attribute | `.hello`, `:hover`, `[type="text"]` | (0, 0, 1, 0) |
| Element and pseudo-element | `h1`, `footer h1`, `::after` | (0, 0, 0, 1) per element |

---

## 🧩 Specificity Calculation

| Selector | Breakdown | Specificity |
|-----------|------------|-------------|
| `h1` | One element selector | (0, 0, 0, 1) |
| `footer h1` | Two element selectors (`footer` + `h1`) | (0, 0, 0, 2) |

Since `(0, 0, 0, 2)` > `(0, 0, 0, 1)`, the **`footer h1`** rule wins.

---

## 🏁 Key Principle

> **The more specific a CSS selector, the higher its priority — regardless of its order in the file.**

**Specificity hierarchy (from strongest to weakest):**
1. Inline styles  
2. ID selectors  
3. Classes, pseudo-classes, and attributes  
4. Elements and pseudo-elements  

---

## ✅ Conclusion

- The `<h1>` inside `<footer>` uses the smaller `1.2em` font size.
- The main `<h1>` (outside the footer) uses `2em`.
- This demonstrates the **CSS specificity** rule that *more specific selectors override less specific ones*, even if they appear earlier in the stylesheet.
