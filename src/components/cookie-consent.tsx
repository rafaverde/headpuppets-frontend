'use client'

import { GoogleTagManager } from '@next/third-parties/google'
import Image from 'next/image'
import { useEffect, useState } from 'react'

import { Button } from './ui/button'

const CONSENT_KEY = '@headpuppets:cookies-consent'

export default function CookieConsent() {
  const [isConsentGranted, setIsConsentGranted] = useState(false)
  const [isBannerVisible, setIsBannerVisible] = useState(false)

  useEffect(() => {
    // Verificamos a escolha anterior do user
    const storedConsent = localStorage.getItem(CONSENT_KEY)

    if (storedConsent === 'true') {
      setIsBannerVisible(false)
      setIsConsentGranted(true)
    } else if (storedConsent === 'false') {
      setIsBannerVisible(false)
    } else {
      setIsBannerVisible(true)
    }
  }, [])

  function handleAccept() {
    localStorage.setItem(CONSENT_KEY, 'true')
    setIsConsentGranted(true)
    setIsBannerVisible(false)
  }

  function handleDecline() {
    localStorage.setItem(CONSENT_KEY, 'false')
    setIsBannerVisible(false)
    setIsConsentGranted(false)
  }

  return (
    <>
      {isConsentGranted && (
        <GoogleTagManager gtmId={process.env.NEXT_PUBLIC_GTM_ID || ''} />
      )}

      <aside
        className={`fixed bottom-0 z-100 w-full ${isBannerVisible ? 'translate-y-0' : 'translate-y-full'} transition-transform duration-700 ease-in-out`}
      >
        <div className="m-4 rounded-lg border border-accent/50 bg-background/90 p-6 text-secondary-foreground shadow backdrop-blur-2xl md:mb-6">
          <div className="container mx-auto flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
            <Image
              src="/head-puppets-logo-simples.svg"
              width={80}
              height={40}
              alt=""
            />
            <div className="grow">
              <h3 className="font-bold text-foreground text-lg">
                Utilizamos cookies.
              </h3>
              <p className="text-sm">
                Utilizamos cookies para analisar o tráfego do site e otimizar
                sua experiência. Ao aceitar, você aceita compartilhar seus
                dados, que são compilados de forma anônima.
              </p>
            </div>
            <div className="mt-4 flex shrink-0 gap-3 md:mt-0">
              <Button
                variant="outline"
                onClick={handleDecline}
                size="lg"
                className="cursor-pointer"
              >
                Recusar
              </Button>
              <Button
                variant="default"
                size="lg"
                onClick={handleAccept}
                className="cursor-pointer"
              >
                Aceitar
              </Button>
            </div>
          </div>
        </div>
      </aside>
    </>
  )
}
