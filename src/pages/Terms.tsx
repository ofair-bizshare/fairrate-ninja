
import React from 'react';
import Header from '@/components/home/Header';
import Footer from '@/components/home/Footer';
import { Link } from 'react-router-dom';

const Terms = () => {
  return (
    <div dir="rtl" className="min-h-screen flex flex-col bg-background">
      <Header professional={null} scrollToRatingSection={() => {}} scrollToBenefits={() => {}} />
      
      <main className="flex-grow py-12">
        <div className="container mx-auto px-4 max-w-4xl">
          <div className="mb-8">
            <Link to="/" className="text-primary hover:underline mb-4 inline-block">← חזרה לעמוד הראשי</Link>
            <div className="prose prose-lg max-w-none">
              <h1 className="text-3xl font-bold mb-8">תקנון ותנאי שימוש – פלטפורמת oFair לצרכנים</h1>
              
              <p className="text-muted-foreground mb-8"><strong>תאריך עדכון: 20.02.2025</strong></p>

              <h2 className="text-2xl font-bold mt-8 mb-4">1. כללי</h2>
              <p>ברוכים הבאים ל-oFair! פלטפורמה חדשנית שמחברת בין צרכנים לבעלי מקצוע, מאפשרת דירוגים אמינים, הזמנת שירותים בקלות, וקבלת הצעות מחיר חכמות. השימוש בפלטפורמה מהווה הסכמה לתנאים המפורטים להלן.</p>

              <h2 className="text-2xl font-bold mt-8 mb-4">2. הגדרות</h2>
              <ul className="list-disc pr-6 space-y-2">
                <li><strong>"הפלטפורמה"</strong> – אתר oFair וכל שירותיו הדיגיטליים.</li>
                <li><strong>"משתמש"</strong> – כל אדם הנרשם לשירותים, ממלא דירוגים או מקבל הצעות מחיר.</li>
                <li><strong>"בעל מקצוע"</strong> – ספק שירות הרשום במערכת ומציע שירותים לצרכנים.</li>
              </ul>

              <h2 className="text-2xl font-bold mt-8 mb-4">3. מטרת הפלטפורמה</h2>
              <ul className="list-disc pr-6 space-y-2">
                <li>לאפשר ללקוחות למצוא בעלי מקצוע מדורגים ואמינים.</li>
                <li>לאפשר לצרכנים לדרג בעלי מקצוע ולסייע לשיפור השירות הכללי.</li>
                <li>לאפשר קבלת הצעות מחיר מכמה בעלי מקצוע ולהשוות ביניהם.</li>
              </ul>

              <h2 className="text-2xl font-bold mt-8 mb-4">4. הרשמה ושימוש בפלטפורמה</h2>
              <ul className="list-disc pr-6 space-y-2">
                <li>הרישום חינם ופתוח לכל אדם מעל גיל 18.</li>
                <li>בהרשמתך לפלטפורמה, אתה מאשר את הסכמתך לקבלת עדכונים, הצעות מבעלי מקצוע והתראות רלוונטיות, כולל הודעות דרך וואטסאפ.</li>
                <li>ניתן להסיר את עצמך מרשימת הדיוור בכל עת דרך הגדרות המשתמש.</li>
              </ul>

              <h2 className="text-2xl font-bold mt-8 mb-4">5. מערכת הדירוגים</h2>
              <p>משתמשי הפלטפורמה רשאים לדרג בעלי מקצוע על בסיס חוויית השירות שקיבלו.</p>
              <p>מערכת הדירוגים כוללת:</p>
              <ul className="list-disc pr-6 space-y-2">
                <li><strong>⭐ דירוג כללי (1-5 כוכבים)</strong></li>
                <li><strong>⏳ עמידה בזמנים</strong> – האם העבודה בוצעה בזמן?</li>
                <li><strong>🏗️ איכות העבודה</strong> – שביעות רצון מהתוצאה הסופית.</li>
                <li><strong>💰 מחיר מול תמורה</strong> – האם המחיר הוגן?</li>
                <li><strong>📞 שירות ותקשורת</strong> – זמינות, יחס ושירותיות.</li>
                <li><strong>🔧 ניקיון וסדר</strong> – אם רלוונטי (למשל בשיפוצים ועבודות שטח).</li>
                <li><strong>👍 המלצה כללית</strong> – האם הייתם ממליצים עליו לאחרים?</li>
              </ul>
              <p>הפלטפורמה שומרת לעצמה את הזכות לבדוק ולסנן ביקורות שאינן עומדות בסטנדרטים של אמינות.</p>

              <h2 className="text-2xl font-bold mt-8 mb-4">6. הזמנת שירותים</h2>
              <ul className="list-disc pr-6 space-y-2">
                <li>משתמשים יכולים להשאיר פנייה למספר בעלי מקצוע ולקבל מהם הצעות מחיר להשוואה.</li>
                <li>oFair אינה אחראית לאיכות העבודה או לתנאי ההתקשרות עם בעלי המקצוע – האחריות הבלעדית חלה על נותן השירות והלקוח.</li>
              </ul>

              <h2 className="text-2xl font-bold mt-8 mb-4">7. פרטיות ואבטחת מידע</h2>
              <ul className="list-disc pr-6 space-y-2">
                <li>המידע הנאסף משמש לצורך מתן שירותי הפלטפורמה בלבד.</li>
                <li>לא יועברו פרטי משתמשים לצדדים שלישיים ללא אישור מפורש, למעט לצורך קבלת שירותים דרך הפלטפורמה.</li>
                <li>המשתמש רשאי לעיין במידע שנאסף עליו ולבקש לתקן או למחוק אותו.</li>
              </ul>

              <h2 className="text-2xl font-bold mt-8 mb-4">8. מבצע השקה – 5% החזר על העבודה הראשונה</h2>
              <ul className="list-disc pr-6 space-y-2">
                <li>צרכנים אשר יבצעו עסקה ראשונה דרך הפלטפורמה ויתנו דירוג יקבלו <strong>5% חזרה מהסכום ששולם</strong>.</li>
                <li>החזר הכספי יתבצע ישירות <strong>לתוך המערכת כהטבה להזמנה הבאה</strong> דרך הפלטפורמה, ויהיה תקף לשימוש למשך <strong>שנה שלמה</strong> מרגע קבלתו. תהליך ההחזר לתוך המערכת יתבצע תוך 14 ימי עסקים מסיום העסקה ודירוג בעל המקצוע.</li>
                <li>ההחזר מוגבל לעסקה אחת לכל משתמש ואינו תקף להזמנות שבוצעו מחוץ למערכת.</li>
              </ul>

              <h2 className="text-2xl font-bold mt-8 mb-4">9. אחריות והגבלת חבות</h2>
              <ul className="list-disc pr-6 space-y-2">
                <li>הפלטפורמה משמשת כמתווך בלבד ואינה אחראית לאיכות השירותים המסופקים על ידי בעלי המקצוע.</li>
                <li>כל התקשרות עם בעלי מקצוע נעשית באחריות המשתמש בלבד.</li>
                <li>הפלטפורמה שומרת לעצמה את הזכות להסיר משתמשים או בעלי מקצוע שאינם עומדים במדיניות השירות.</li>
              </ul>

              <h2 className="text-2xl font-bold mt-8 mb-4">10. יצירת קשר</h2>
              <p>לשאלות ובירורים ניתן לפנות לשירות הלקוחות שלנו בכתובת: <a href="mailto:info@ofair.com" className="text-primary hover:underline">info@ofair.com</a> או דרך טופס יצירת הקשר באתר.</p>

              <div className="mt-12 pt-6 border-t border-gray-200">
                <p className="text-xl font-bold text-center">oFair – מוצאים, משווים, חוסכים! 🚀</p>
              </div>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Terms;
