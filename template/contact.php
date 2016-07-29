<?
    $page='contact';
    include('header.php');
    include('script/functions.php');
?>


        <!-- Content area -->
        <div class="page-wrap contact-wrap">
            <!-- Social icons/links -->
            <div class="contact-icons">
                <h3>Connect with Me</h3>
                <ul>
                    <li><a href="mailto:me@mauricewright.info" title="Send me an e-mail" class="email">
                        <? include('img/envelop.svg'); ?>
                        <span>Send me an e-mail</span>
                    </a></li>

                    <li><a href="" title="Subscribe to my RSS Feed" class="rss">
                        <? include('img/rss.svg'); ?>
                        <span>Subscribe to my RSS Feed</span>
                    </a></li>

                    <li><a href="https://www.facebook.com/ki4pzs" title="Like my Facebook" class="facebook">
                        <? include('img/facebook.svg'); ?>
                        <span>Like my Facebook</span>
                    </a></li>

                    <li><a href="https://www.twitter.com/ki4pzs" title="Follow me on Twitter" class="twitter">
                        <? include('img/twitter.svg'); ?>
                        <span>Follow me on Twitter</span>
                    </a></li>

                    <li><a href="https://plus.google.com/+MauriceWrightki4pzs/about/p/pub" title="Join my circle on Google" class="google">
                        <? include('img/google.svg'); ?>
                        <span>Join my circle on Google</span>
                    </a></li>

                    <li><a href="https://www.linkedin.com/in/MauriceWright-ki4pzs" title="Connect with me on LinkedIn" class="linkedin">
                        <? include('img/linkedin.svg'); ?>
                        <span>Connect with me on LinkedIn</span>
                    </a></li>

                    <li><a href="https://www.github.com/MauriceWright" title="Fork my GitHub" class="github">
                        <? include('img/github.svg'); ?>
                        <span>Fork my GitHub</span>
                    </a></li>

                    <li><a href="https://www.instagram.com/ki4pzs/" title="Follow my Instagram" class="instagram">
                        <? include('img/instagram.svg'); ?>
                        <span>Follow my Instagram</span>
                    </a></li>

                    <li><a href="https://www.flickr.com/photos/ki4pzs/" title="View my Flickr" class="flickr">
                        <? include('img/flickr.svg'); ?>
                        <span>View my Flickr</span>
                    </a></li>

                    <li><a href="http://www.last.fm/user/ki4pzs" title="Hear my favs on Last FM" class="lastfm">
                        <? include('img/lastfm.svg'); ?>
                        <span>Hear my favs on Last FM</span>
                    </a></li>

                    <li><a href="https://soundcloud.com/maurice-wright-858022962" title="Hear my favs on SoundCloud" class="soundcloud">
                        <? include('img/soundcloud.svg'); ?>
                        <span>Hear my favs on SoundCloud</span>
                    </a></li>
                </ul>
            </div>

            <!-- Last FM feed -->
            <? $fm = json_decode(getLastFm()); ?>
            <div class="feed-lastfm">
                <h3>Recent tracks on Last FM</h3>
                <ul class="fm-tracks" data-time="<? echo $fm->{'time'}; ?>">
                    <!-- Last FM API feed -->
                    <? foreach ($fm->{'tracks'} as $track) : ?>
                    <li class="fm-track"><a href="<? echo $track->{'url'}; ?>">
                        <? if(empty($track->{'image-lg'})){ include('img/Logo.svg'); }else{ echo '<img src="'.$track->{'image-lg'}.'" alt="'.htmlentities($track->{'title'},ENT_QUOTES|ENT_HTML5,'UTF-8').' &bull '.$track->{'artist'}.'" class="fm-image">'; } ?>
                        <dl class="fm-data">
                            <dt><? echo htmlentities($track->{'title'},ENT_QUOTES|ENT_HTML5,'UTF-8'); ?></dt>
                            <dd><? echo htmlentities($track->{'artist'},ENT_QUOTES|ENT_HTML5,'UTF-8'); ?></dd>
                        </dl>
                    </a></li>

                    <? endforeach ?>
                </ul>
            </div>
        </div>

<?php $FClass='footer-contact'; include('footer.php'); ?>