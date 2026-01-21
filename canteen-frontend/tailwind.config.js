/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            colors: {
                primary: "#EF4F5F",
                "primary-dark": "#D73243",
                secondary: "#1F2937",
                accent: "#FFB800",
                surface: "#F9FAFB",
                "text-muted": "#6B7280",
            }
        },
    },
    plugins: [],
}
