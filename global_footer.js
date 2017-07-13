<script>
 /* SQUARESPACE LANGUAGE MENU - HAYDEN TEMPLATE
 ** Adaptation of code from Raphael Boos and tazmeah from Squarespace forums
 ** Settings > Advanced > Code Injection > Footer
 ** Note: First level of all url slugs must be language code - /en/index
 **
 ** See header.js and custom.css.
 */
  
 //load the YUI node
YUI().use('node', function (Y) {
    // output a menu on every page
    var output = true;
    // set default language
    var language = "en";
    // define languages
    var allowedLanguages = new Array();
    allowedLanguages['fr'] = {
        label:'French',
        short:'FR',
        url:'/fr/portfolio',
        lang:'fr-FR'
    };
    allowedLanguages['en'] = {
        label:'English',
        short:'EN',
        url:'/en/portfolio',
        lang:'en-GB'
    };

    // detect current language, keep default if not configured
    var tempLanguage = getLanguage(allowedLanguages);
    if(tempLanguage !== null){
        language = tempLanguage;
    }

    var selector = [
        '#mainNavigation > div > label:not([data-href*=\"/' + language + '/\"])', 
        '#mainNavigation > div > a:not([href*=\"/' + language + '/\"])', 
        '#mobileNavigation > div > label:not([data-href*=\"/' + language + '/\"])', 
        '#mobileNavigation > div > a:not([href*=\"/' + language + '/\"])',
        '#secondaryNavigation > div > label:not([data-href*=\"/' + language + '/\"])', 
        '#secondaryNavigation > div > a:not([href*=\"/' + language + '/\"])'
    ]; 

    // remove all nodes not in current language
    Y.all(selector.join()).get('parentNode').remove();

    // output: append to main and mobile navigation
    if(output){    
        Y.all('#mainNavWrapper,#mobileNavWrapper').append(buildLanguageMenuHTML(language, allowedLanguages, 'right top'));
    }

    // adapt html lang attribute
    Y.one('html').setAttribute('lang', allowedLanguages[language].lang);

    //make home button language sensitive
    $("img[alt='Groupe Tran Spensieri']").parent().attr("href", "/" + language + "/portfolio");
    // if home button is text instead of image
    // $("a:contains('Groupe Tran Spensieri')").attr("href", "/" + language + "/portfolio");
});
 
function buildLanguageMenuHTML(strCurrentLang, arrAllowedLangs, strClass){
    var htmlTemplate = '<nav id="langNavigation" class="' + strClass + '"><div class="folder"><input type="checkbox" name="folder-toggle-lang-navigation" id="folder-toggle-lang-navigation" class="folder-toggle-box hidden"><label for="folder-toggle-lang-navigation" class="folder-toggle-label" onclick="" data-href="' + getUrl(strCurrentLang, arrAllowedLangs) + '">' + arrAllowedLangs[strCurrentLang].short + '</label><div class="subnav">###languages###</div></div></nav>';
    var htmlTemplateInner = '<div class="collection"><a href="###url###">###label###</a></div>';
    var htmlInner='';
    var htmlOutput='';
    for(language in arrAllowedLangs){
        if(arrAllowedLangs.hasOwnProperty(language)){
            htmlInner += htmlTemplateInner.replace('###label###', arrAllowedLangs[language].label).replace('###url###',getUrl(language, arrAllowedLangs);
        }
    }    
    htmlOutput = htmlTemplate.replace('###languages###',htmlInner);
    return htmlOutput;
}

function getLanguage(arrAllowedLangs){
    //return null if no language found
    var strLang = null;
    urlparts = getUrlParts();
    if(urlparts[0] in arrAllowedLangs){
        strLang =  urlparts[0];
    }
    return strLang;
}

function getUrl(strCurrentLang, arrAllowedLangs){
    //return url for current page of selected language
    if(urlparts[1]){
        return "/" + strCurrentLang + "/" + urlparts[1];
    }
    //else return homepage for current lang
    return arrAllowedLangs[strCurrentLang].url;
}
function getUrlParts(){
    var urlparts = document.location.pathname;
    if(urlparts.startsWith("/")){
        urlparts = urlparts.substr(1);
    }
    if(urlparts.endsWith("/")){
        urlparts = urlparts.substr(0,urlparts.length-1);
    }
    if(urlparts.length) {
        urlparts = urlparts.split("/");
    }
    return urlparts;
}
</script>