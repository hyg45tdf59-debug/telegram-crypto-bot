export const useTelegram = () => {
  const getTelegramUser = () => {
    // @ts-ignore - Telegram SDK
    const webApp = window.Telegram?.WebApp
    
    if (!webApp) {
      console.warn('Telegram WebApp not available')
      return null
    }

    return {
      id: webApp.initDataUnsafe?.user?.id,
      firstName: webApp.initDataUnsafe?.user?.first_name,
      lastName: webApp.initDataUnsafe?.user?.last_name,
      username: webApp.initDataUnsafe?.user?.username,
      photoUrl: webApp.initDataUnsafe?.user?.photo_url,
      isPremium: webApp.initDataUnsafe?.user?.is_premium,
      languageCode: webApp.initDataUnsafe?.user?.language_code
    }
  }

  const sendWebAppData = (data: Record<string, any>) => {
    // @ts-ignore - Telegram SDK
    window.Telegram?.WebApp?.sendData(JSON.stringify(data))
  }

  const closeWebApp = () => {
    // @ts-ignore - Telegram SDK
    window.Telegram?.WebApp?.close()
  }

  return {
    getTelegramUser,
    sendWebAppData,
    closeWebApp
  }
}
