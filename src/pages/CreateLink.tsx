import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';
import { Copy, ExternalLink } from 'lucide-react';

const CreateLink = () => {
  const [profName, setProfName] = useState('');
  const [profPhone, setProfPhone] = useState('');
  const [companyName, setCompanyName] = useState('');
  const [customerName, setCustomerName] = useState('');
  const [customerPhone, setCustomerPhone] = useState('');
  const [generatedUrl, setGeneratedUrl] = useState('');
  const { toast } = useToast();

  const generateLink = () => {
    const baseUrl = window.location.origin;
    const params = new URLSearchParams();
    
    if (profName) params.set('profName', profName);
    if (profPhone) params.set('profPhone', profPhone);
    if (companyName) params.set('companyName', companyName);
    if (customerName) params.set('customerName', customerName);
    if (customerPhone) params.set('customerPhone', customerPhone);
    
    const url = `${baseUrl}/?${params.toString()}`;
    setGeneratedUrl(url);
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(generatedUrl);
    toast({
      title: "הקישור הועתק!",
      description: "הקישור הועתק ללוח",
    });
  };

  const openLink = () => {
    window.open(generatedUrl, '_blank');
  };

  return (
    <div className="min-h-screen bg-background p-8">
      <div className="max-w-2xl mx-auto">
        <Card>
          <CardHeader>
            <CardTitle className="text-2xl">יצירת קישור לדירוג</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="profName">שם נותן השירות *</Label>
                <Input
                  id="profName"
                  value={profName}
                  onChange={(e) => setProfName(e.target.value)}
                  placeholder="יוסי כהן"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="profPhone">טלפון נותן השירות</Label>
                <Input
                  id="profPhone"
                  value={profPhone}
                  onChange={(e) => setProfPhone(e.target.value)}
                  placeholder="0542486688"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="companyName">שם החברה</Label>
                <Input
                  id="companyName"
                  value={companyName}
                  onChange={(e) => setCompanyName(e.target.value)}
                  placeholder='כהן אינסטלציה בע"מ'
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="customerName">שם הלקוח</Label>
                <Input
                  id="customerName"
                  value={customerName}
                  onChange={(e) => setCustomerName(e.target.value)}
                  placeholder="דני לוי"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="customerPhone">טלפון הלקוח</Label>
                <Input
                  id="customerPhone"
                  value={customerPhone}
                  onChange={(e) => setCustomerPhone(e.target.value)}
                  placeholder="0501234567"
                />
              </div>
            </div>

            <Button onClick={generateLink} className="w-full" size="lg">
              צור קישור
            </Button>

            {generatedUrl && (
              <div className="space-y-3 p-4 bg-muted rounded-lg">
                <Label>הקישור שנוצר:</Label>
                <div className="bg-background p-3 rounded border break-all text-sm">
                  {generatedUrl}
                </div>
                <div className="flex gap-2">
                  <Button onClick={copyToClipboard} variant="outline" className="flex-1">
                    <Copy className="ml-2 h-4 w-4" />
                    העתק קישור
                  </Button>
                  <Button onClick={openLink} variant="outline" className="flex-1">
                    <ExternalLink className="ml-2 h-4 w-4" />
                    פתח קישור
                  </Button>
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default CreateLink;
