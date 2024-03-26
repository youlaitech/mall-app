import { defineStore } from 'pinia';
import { getMemberInfo as getMemberInfoApi } from '@/api/member';
import { MemberInfo } from '@/api/member/types';

export const useMemberStore = defineStore('member', () => {
    const member = ref<MemberInfo | null>(null);

    function getMemberInfo() {
        return new Promise<MemberInfo>((resolve, reject) => {
            getMemberInfoApi()
                .then((data) => {
                    member.value = data;
                    resolve(data);
                })
                .catch((error) => {
                    reject(error);
                });
        });
    }

    return {
        member,
        getMemberInfo,
    };
});
