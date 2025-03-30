export const replaceXSS = (checkTarget) => {
    if (typeof checkTarget === 'string' && checkTarget !== null) {
        const lt = /</g, gt = />/g, ap = /'/g, ic = /"/g;
        return checkTarget.replace(lt, "&lt;").replace(gt, "&gt;").replace(ap, "&#39;").replace(ic, "&#34;");
    }
    else {
        console.error('Invalid checkTarget. It should be a non-null string.');
        return '';
    }
};
//# sourceMappingURL=dataHelper.js.map