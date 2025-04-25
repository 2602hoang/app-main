import { useToken } from '@/hooks/useToken';
import { useUserStore } from '@/stores/userStore';
import axios from 'axios';
import React from 'react'

const ProfileData = () => {

    const { accessToken } = useToken();
    const { setUser } = useUserStore();
    const getUserInfo = async () => {
        try {
            const response = await axios.get(
                "https://p2p-gateway-sandbox.up.railway.app/api/v1/users/profile",
                {
                    headers: {
                        Authorization: `Bearer ${accessToken}`,
                    },
                }
            );
            if (response.status === 200) {
                setUser(response.data.data);
            } else {
                console.error('Failed to fetch user info:', response.statusText);
            }
        } catch (error) {
            console.error('Error fetching user info:', error);
        }
    };
    React.useEffect(() => {
        if (accessToken) {
            getUserInfo();
        }
    }, [accessToken]);
    
    return null;
}

export default ProfileData