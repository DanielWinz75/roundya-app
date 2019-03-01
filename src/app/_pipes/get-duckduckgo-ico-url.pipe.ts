import { Pipe, PipeTransform, Injectable } from '@angular/core'; 

@Pipe({
    name:'getDuckDuckGoIcoUrl'
})
export class GetDuckDuckGoIcoUrl implements PipeTransform {
    transform(clientSiteUrl: string): string{

        if (!clientSiteUrl) {
            return 'https://proxy.duckduckgo.com/ip3/unbekannt.ico';
        }

        const from = clientSiteUrl.indexOf('https') ? 7 : 6;
        const to = clientSiteUrl.length;
        const domain = clientSiteUrl.substr(from, to);
        const duckDuckGoBasisUrl = 'https://proxy.duckduckgo.com/ip3/';

        console.log(from, ' ', to, ' ', domain, ' ', duckDuckGoBasisUrl);
        return duckDuckGoBasisUrl + domain + '.ico';
    }
}