import React, { useEffect, useState } from 'react'
import { useSearchParams, Navigate } from 'react-router-dom'
import PageLoadingSpinner from '~/components/Loading/PageLoadingSpinner'
import { verifyUserApi } from '~/apis/index'

const AccountVerification = () => {
  // Lấy giá trị email và token từ url
  let [searchParams] = useSearchParams()
  const { email, token } = Object.fromEntries([...searchParams])
  // verify tai khoan
  const [verified, setVerified] = useState(false)
  if (!email || !token) {
    return <Navigate to="/404" />
  }
  useEffect(() => {
    if (email && token) {
      verifyUserApi({ email, token }).then(() => setVerified(true))
    }
  }, [email, token])
  if (!verified) {
    return <PageLoadingSpinner caption="Verify your account..." />
  }
  // không gặp vấn đề + verify thành công điều hướng sang trang login cùng giá trị verifyemail
  return <Navigate to={`/login?verifiedEmail=${email}`} />
}

export default AccountVerification