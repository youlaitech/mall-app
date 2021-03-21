const getters = {
	hasLogin: state => state.user.hasLogin,
	nickname: state => state.user.nickname,
	avatar: state => state.user.avatar,
	balance: state => state.user.balance,
	memberId: state => state.user.memberId
}
export default getters
