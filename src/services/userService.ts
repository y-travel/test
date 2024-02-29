const getPerson = async () => (await Service.api.requestGet(`people/${Utils.auth.getMe()?.person?.id}`))?.data;

export { getPerson };
