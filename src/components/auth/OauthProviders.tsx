import { CredentialResponse, GoogleLogin, GoogleOAuthProvider } from '@react-oauth/google'
import { googleOauthLogin } from '../../features/auth/authApi'
import { useDispatch } from 'react-redux'
import { AppDispatch } from '../../app/store'


const OauthProviders = () => {
  const dispatch = useDispatch<AppDispatch>()
  const GOOGLE_CLIENT_ID = import.meta.env.VITE_GOOGLE_CLIENT_ID

  const handleGoogleOauthRes = (credRes: CredentialResponse) => {
    console.log('oauth success ')
    console.log(credRes.credential?.length)
    if (credRes.credential) {
      dispatch(googleOauthLogin(credRes.credential))
    } else {
      console.log('oauth failed')
    }
  }

  const handleGoogleOauthError = () => {
    console.log('login failed')
  }

  return (
    <section>
      <div className='flex items-center'>
        <span className='bg-gray-400 h-0.5 w-full rounded'></span>
        <h1 className='mx-3 text-gray-900'>or</h1>
        <span className='bg-gray-400 h-0.5 w-full rounded'></span>
      </div>

      <div className='flex justify-start items-center '>
        <GoogleOAuthProvider clientId={GOOGLE_CLIENT_ID}>
          <GoogleLogin
            type='icon'
            theme='filled_blue'
            onSuccess={handleGoogleOauthRes}
            onError={handleGoogleOauthError}
          />
        </GoogleOAuthProvider>
      </div>

    </section>
  )
}

export default OauthProviders