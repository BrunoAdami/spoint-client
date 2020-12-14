import React, { useState, useRef } from 'react';
import PropTypes from 'prop-types';
import Button from '../../atoms/loginButton';
import GoBackHeader from '../../molecules/goBackHeader';
import Input from '../../atoms/input';
import ProfilePicIcon from '../../atoms/profilePicIcon';
import Loader from '../../atoms/loader';
import Modal from '../../molecules/modal';
import Header from '../../molecules/header';
import AppBar from '../../molecules/appBar';
import { Colors } from '../../../config';

const AppCustomer = (props) => {
  // STATE VARIABLES
  const [step, setStep] = useState(0);
  // other
  const NotLoadingOrSuccessOrError = !props.loading && !props.success && !props.error;
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        height: 'auto',
        alignItems: 'center',
        backgroundColor: Colors.SECONDARY,
      }}
    >
      <Header />
      <div style={{ padding: 20 }}>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis tortor est, sagittis sed est eu, pellentesque
        tincidunt massa. Morbi eu ante lacus. Pellentesque vel orci at lorem rutrum sodales vel a nunc. Donec et turpis
        semper leo condimentum fermentum eget ut lectus. Donec vitae mattis tortor, in condimentum felis. Aliquam quis
        tincidunt dolor. Integer pharetra posuere purus in auctor. Donec ligula risus, tristique eget massa in, laoreet
        semper justo. Quisque tristique ligula nisi, a placerat ante consequat quis. Suspendisse potenti. Curabitur
        ultrices sodales tellus ullamcorper semper. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Orci varius
        natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Etiam elementum dapibus ante, sit
        amet scelerisque justo rhoncus pulvinar. Phasellus eget est elit. Sed nec nulla a justo pharetra cursus pharetra
        vel quam. Donec egestas tempus orci, eget eleifend neque blandit in. Duis id rhoncus dolor. Morbi id auctor
        odio. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec tempor,
        mauris non molestie molestie, nisi massa aliquam nunc, vitae consequat dolor arcu at nunc. Aliquam tempus enim
        fermentum, gravida arcu eget, sodales elit. Nullam vehicula felis risus, at aliquam mi dapibus nec. Mauris
        congue in ligula at molestie. Nam porttitor volutpat risus, a congue lorem placerat id. Maecenas a mi ut eros
        vehicula fringilla a sit amet nisi. Sed imperdiet enim elit, dignissim placerat leo efficitur sit amet. Integer
        sed nunc arcu. Suspendisse feugiat scelerisque tincidunt. Vestibulum eu libero magna. Etiam justo erat, lobortis
        id sodales non, egestas id mauris. Sed rutrum blandit nibh, a scelerisque metus pretium vitae. Praesent ultrices
        ut nulla et sodales. Etiam at pharetra diam, a elementum est. Sed suscipit placerat purus, in semper enim
        viverra non. Vestibulum eu convallis ligula, et cursus ex. Nunc in tortor sit amet mauris consequat interdum.
        Aliquam mollis vitae augue et congue. Nam dignissim dictum nulla, non rhoncus velit rhoncus at. Nulla molestie
        lorem lacus, quis congue odio hendrerit non. Nam posuere augue vel urna aliquet, sit amet cursus nisi ornare.
        Nulla in placerat est. Quisque ipsum felis, rhoncus sit amet eros nec, porta ultrices nisl. Vestibulum diam
        lacus, tincidunt non augue eu, posuere congue orci. Maecenas sollicitudin commodo tellus at convallis. Ut quis
        ultricies elit, id auctor risus. Fusce congue, lorem vel tempus ornare, lorem risus pharetra metus, ac placerat
        enim nisl vitae metus. Proin id vulputate nisi. Mauris egestas nisl justo, a ultrices justo dignissim nec.
        Integer a facilisis justo. Curabitur molestie in lacus eu feugiat. Donec luctus interdum mi finibus finibus.
        Nulla id odio urna. Mauris ante ipsum, feugiat ac tincidunt sit amet, convallis nec massa. Nam mi sapien,
        efficitur nec aliquam ut, sollicitudin ultricies nunc. Vestibulum sit amet imperdiet quam, vel ornare tellus.
        Vestibulum ut nisl et lacus ornare fermentum a non odio. Suspendisse lacinia lobortis nulla, vel sagittis purus
        luctus eu. Vivamus id dolor neque. Aenean at risus a neque accumsan vestibulum vel id quam. Nulla sit amet
        euismod sem. Fusce pellentesque lacus ante, at faucibus magna dapibus nec. Aliquam id ullamcorper mi. Vivamus
        leo risus, tristique et risus et, ullamcorper lacinia dui. Pellentesque lobortis tincidunt tincidunt. Ut
        volutpat nibh eros, vitae varius quam condimentum cursus. Etiam porta mauris tellus. Suspendisse quis ex et
        sapien sagittis scelerisque. Nam porta elit id justo finibus, venenatis blandit ipsum tempus. Nam non euismod
        nisi. Etiam ac felis vel enim volutpat ultrices. Vestibulum lobortis lectus ut blandit interdum. Etiam pretium
        sit amet tortor et tristique. Ut maximus, quam at dignissim vestibulum, libero sapien gravida dui, sit amet
        porta purus dui id quam. Cras eget finibus turpis, sit amet maximus risus. Aenean tempus rhoncus eros volutpat
        tristique. Cras varius enim et risus finibus, rutrum imperdiet dui sodales. Maecenas euismod felis eu ante
        auctor vehicula. Curabitur a bibendum massa. Phasellus sed commodo massa, vel sodales eros. Donec maximus
        sollicitudin ante, in facilisis erat dictum et. Proin facilisis nunc massa, id sagittis lorem venenatis id. Nunc
        dignissim pretium lacus, a commodo tellus iaculis ut. Sed lobortis iaculis tortor, vel lobortis urna blandit ut.
        Ut aliquam venenatis ex. Fusce non ante tincidunt, mollis odio eu, viverra enim. Quisque pharetra tellus urna,
        vel auctor velit venenatis in. Vivamus molestie diam sed mi rhoncus ultrices. Maecenas sed lectus orci. In
        lobortis, arcu id placerat dignissim, neque nunc commodo lorem, sit amet pellentesque arcu urna ac sapien. Proin
        ac mollis justo. Sed nec eros at nulla viverra commodo. Integer sollicitudin varius ultricies. Nulla eu ligula
        augue. Donec luctus diam ante, nec aliquet odio ornare ac. Morbi sollicitudin commodo odio non pulvinar.
        Maecenas feugiat aliquet nibh, eget mattis odio suscipit eget. Duis venenatis, massa id feugiat commodo, arcu
        lacus congue eros, non varius leo sem eu tellus. Proin id ligula tempus, eleifend est a, rutrum mauris. Etiam
        nec mi diam. Donec dignissim rhoncus mauris, facilisis pulvinar augue porta id. Nulla ut eleifend ligula.
        Integer at est egestas ante vulputate porttitor. Integer vulputate justo id quam fermentum, in rhoncus erat
        eleifend. Duis scelerisque mi non elit scelerisque tristique. Aenean tincidunt risus aliquam, dignissim dui ut,
        pharetra ligula. In hac habitasse platea dictumst. Orci varius natoque penatibus et magnis dis parturient
        montes, nascetur ridiculus mus. Phasellus tempus mollis dignissim. Nunc vitae risus consequat, vulputate orci
        vel, venenatis nunc. Vivamus ullamcorper urna nisl, vel congue mi sollicitudin vel. Morbi pulvinar odio non
        gravida blandit. Nunc imperdiet blandit tellus, vel venenatis est consequat et. Integer vulputate euismod est,
        vitae posuere libero congue id. Aliquam luctus velit at felis mattis, sit amet dapibus tellus luctus. Duis et
        ultricies urna, ac scelerisque nisi. Nam hendrerit hendrerit nulla, sit amet rhoncus diam sollicitudin ut.
        Aenean mattis nulla a leo mattis laoreet. Aliquam erat volutpat. Ut sit amet lacus elit. Ut pharetra odio a
        eleifend pellentesque. Vivamus sit amet semper ipsum. Vivamus eu rutrum velit. Praesent molestie facilisis
        velit, in consectetur mi elementum non. Nunc convallis, metus eget mattis suscipit, arcu lacus consectetur
        mauris, at commodo purus lacus ut sem. Maecenas consequat velit libero, non mattis lacus vehicula et. Nulla
        auctor commodo finibus. Sed id hendrerit nisi. Vivamus lobortis lectus at nisl vestibulum tincidunt. Integer
        quis eleifend magna. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc venenatis nunc nisl, id
        consequat nisi ultricies in. Integer ac leo ut felis gravida dapibus ac elementum nisi. Aliquam scelerisque
        semper nisl vel dapibus. Sed scelerisque massa augue, ut vulputate erat ullamcorper ac. Fusce et est massa.
        Aliquam eros ante, tristique interdum tellus a, cursus pharetra nibh. Curabitur mollis lacinia ex, scelerisque
        tristique justo dapibus non. Integer ultrices risus auctor aliquam ullamcorper. Aenean nec sapien maximus,
        accumsan urna non, semper lacus. Aenean finibus sodales nibh ac porta. Mauris sit amet ipsum sed libero euismod
        hendrerit. Maecenas neque nisi, interdum a euismod vitae, congue eu turpis. Nulla consequat, mi in ultricies
        dapibus, dolor arcu aliquet nibh, eu imperdiet magna ante sit amet arcu. Suspendisse nec vehicula sem. Quisque
        sed arcu a dolor aliquam volutpat id ac lectus. Suspendisse tincidunt odio non leo mollis, eu vulputate augue
        elementum. Phasellus rhoncus orci non est dictum, a lacinia turpis fermentum. Fusce porta luctus risus, id
        volutpat arcu feugiat a. Fusce in nisl pharetra, finibus orci eget, consectetur magna. Interdum et malesuada
        fames ac ante ipsum primis in faucibus. Integer tempor lacus a ligula scelerisque hendrerit. Vivamus faucibus in
        arcu eu elementum. Donec feugiat lectus eu est cursus, a porttitor orci finibus. Cras ornare lacinia tempus.
        Proin tincidunt urna scelerisque, maximus eros in, tristique justo. Nam sed viverra urna, ut commodo quam. Donec
        quis mattis lectus, a ornare nunc. Praesent at elit enim. Aliquam vel malesuada leo. Mauris pretium in elit eu
        lacinia. Maecenas ultricies elit at ultricies faucibus. In hac habitasse platea dictumst. In ex ex, suscipit
        quis porta a, pulvinar eu turpis. Vestibulum euismod dolor tincidunt ultricies imperdiet. Curabitur nec laoreet
        leo. Quisque lobortis dolor non neque porttitor porta. Nullam purus nisi, egestas a velit quis, vestibulum
        placerat enim. Proin accumsan lorem eu odio mollis, at maximus ipsum fermentum. Suspendisse porta lectus orci,
        id ultricies ante cursus ut. Phasellus faucibus risus libero, ut egestas odio mattis a. Aliquam erat volutpat.
        Donec eget suscipit urna, dignissim rhoncus ex. Quisque ut velit ullamcorper diam pharetra gravida auctor sed
        ipsum. Mauris vestibulum tellus a vulputate mollis. Praesent at mollis risus. Nulla faucibus velit eros, tempor
        consectetur libero congue at. Nam sed metus nec tellus porta pellentesque. Morbi congue ipsum neque, tincidunt
        aliquam nisl blandit id. Suspendisse nulla ligula, iaculis vitae metus vitae, suscipit suscipit massa. Phasellus
        erat libero, molestie a gravida at, efficitur ac dolor. Donec rutrum dui et dictum fringilla. Vestibulum in
        sodales ipsum, consequat semper nulla. Interdum et malesuada fames ac ante ipsum primis in faucibus. In sit amet
        tellus mauris. Aliquam mattis mauris eu tortor rhoncus, dignissim venenatis enim finibus. Orci varius natoque
        penatibus et magnis dis parturient montes, nascetur ridiculus mus. Sed feugiat quam in augue tincidunt finibus.
        Donec semper, urna id convallis auctor, nunc quam placerat turpis, nec sagittis mi quam id sem. Maecenas
        interdum accumsan ligula, id malesuada libero posuere sit amet. Donec mollis, est quis tincidunt rutrum, mauris
        sapien rutrum nisi, at dictum ligula magna at sapien. Vestibulum non sagittis eros, at scelerisque velit. Aenean
        id sem id lectus mollis dapibus non sit amet ligula. Praesent sed tempor enim, vitae faucibus nisi. Fusce tempus
        nulla arcu, blandit vehicula metus condimentum in. Proin quis pharetra justo. Pellentesque eget nulla dolor. Nam
        et nisl faucibus, fringilla velit eget, aliquet purus. Donec in egestas nibh, id tempor tortor. Integer vitae
        varius justo, sed rhoncus ex. Mauris ultrices nibh eros, non interdum nisl hendrerit id. Vestibulum efficitur
        elit sit amet tellus molestie dictum. Quisque convallis nisl dolor, sit amet sagittis dolor dictum sed. Nulla
        efficitur mi efficitur est ultricies dictum. Pellentesque cursus, lorem a aliquam consectetur, justo eros
        consectetur sem, ac mattis justo erat nec augue. Praesent pretium vitae purus et aliquam. Donec pulvinar felis
        at ante feugiat, sit amet consequat dui varius. Nulla eu mollis dolor. Cras accumsan nunc ut nisl commodo, sed
        vehicula dolor iaculis. Mauris vitae bibendum lacus. Mauris molestie, nunc vitae hendrerit posuere, lorem massa
        euismod ante, scelerisque gravida ex orci vitae lectus. Nam tellus metus, tincidunt sed imperdiet quis, congue
        vel turpis. Integer non bibendum orci. In condimentum, sem nec varius tincidunt, ante nulla sagittis sem, non
        auctor quam sapien eget odio. In vitae condimentum nunc. Cras lacus enim, tincidunt sed nulla in, volutpat
        cursus tortor. Donec at erat eget sem finibus consequat. Phasellus urna metus, tempor non ultricies a, accumsan
        non eros. Curabitur pretium feugiat lorem in gravida. Aliquam erat volutpat. Vivamus lectus odio, bibendum in
        dolor in, mollis imperdiet massa. Suspendisse potenti. In imperdiet vitae erat sit amet posuere. Suspendisse
        sodales consequat enim, in tincidunt purus vehicula at. Sed elementum est elit, et placerat tortor lacinia id.
        Ut imperdiet leo et sapien tristique, a convallis eros semper. Ut in tellus interdum, aliquet magna non, laoreet
        magna. Vestibulum egestas commodo condimentum. Nullam hendrerit dictum tellus eu molestie. Cras vestibulum
        suscipit enim non aliquam. Nulla purus neque, volutpat at tellus sit amet, egestas hendrerit sem.
      </div>
      <AppBar
        selectedPage={'home'}
        handleHomeSelected={() => console.log('click')}
        handleProfileSelected={() => console.log('click')}
      />
    </div>
  );
};

const { func, any, bool } = PropTypes;

AppCustomer.propTypes = {
  nameValue: any.isRequired,
};

export default AppCustomer;
