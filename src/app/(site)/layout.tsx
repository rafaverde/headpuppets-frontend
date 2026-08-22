import { GlobalSettingsService } from '@/api/services/global-settings.service'
import CookieConsent from '@/components/cookie-consent'
import Header from '@/components/header'
import Footer from '@/components/sections/footer'

export default async function SiteLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  const { whatsapp } = await GlobalSettingsService.getGlobalSettings()

  return (
    <main>
      <Header whatsapp={whatsapp} />
      {children}
      <Footer />
      <CookieConsent />
    </main>
  )
}
