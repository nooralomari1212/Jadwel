import React from 'react'
import { Container, DoubleSidedImage } from 'components/shared'

const AccessDenied = () => {
    return (
        <Container className="h-full">
            <div className="h-full flex flex-col items-center justify-center">
                <DoubleSidedImage
                    src="/img/others/op.png"
                    darkModeSrc="/img/others/welcome.png"
                    alt="Access Denied!"
                />
                <div className="mt-6 text-center">
                    <h3 className="mb-2">التسجيل مغلق</h3>
                    <p className="text-base">
                        !لا يمكنك اقتراح مساق خارج فتره التسجيل
                    </p>
                </div>
            </div>
        </Container>
    )
}

export default AccessDenied
