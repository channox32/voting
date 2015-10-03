<?php
/**
 * Step 1: Require the Slim Framework
 *
 * If you are not using Composer, you need to require the
 * Slim Framework and register its PSR-0 autoloader.
 *
 * If you are using Composer, you can skip this step.
 */
require 'Slim/Slim.php';
require 'Slim/Database/Db.php';
\Slim\Slim::registerAutoloader();

$app = new \Slim\Slim();

function db(){
	return new Db('mysql','localhost','pnhs_ssg','root','');
}

function getPOSTParams(){
    $app = new \Slim\Slim();
    return $app->request->getBody();
}


$app->post('/registerStudent',function() use ($app) {	
    $params = getPOSTParams();
    $params = json_decode($params,true);
     $inputData = array(
     		'firstname' => $params['firstname'],
     		'lastname' => $params['lastname'],
     		'middlename' => $params['middlename'],
     		'gender' => $params['gender'],
     		'birthdate' => $params['birthdate'],
     		'yearlevel' => $params['yearlevel'],
     		'section' => $params['section']
     	);

    if($query = db()->create('student_info',$inputData)){
    	echo json_encode($query->id());
    }else{
    	echo json_encode(array('result' => 'error', 'cause' => 'Database Error!'));
    }

});

$app->post('/getCandidateInfo', function() use ($app){
    $query = db()->select('candidate_list','*');
    if($query){
        echo json_encode($query->all());
    }else{
        echo json_encode(array('result' => 'error'));
    }

});

$app->post('/changePass',function() use ($app){
    $params = getPOSTParams();
    $params = json_decode($params,true);
    $data = array(
            'admin_id' => $params['admin_id'],
            'password' => SHA1($params['password'])
        );
    if($query = db()->update('admin_info',$data)){
        echo json_encode(array('result'=>'success'));
    }else{
        echo json_encode(array('result'=> 'error'));
    }

});


$app->post('/adminLogin',function() use ($app){
    $params = getPOSTParams();
    $params = json_decode($params,true);
    $adminData = array(
            'username' => mysql_real_escape_string($params['username']),
            'password' => SHA1(mysql_real_escape_string($params['password'])),
        );
    if($query = db()->select('admin_info','*',$adminData)){
        echo json_encode($query->fetch(false));
    }else{
        echo json_encode(array('message' => 'No user found!'));
    }

});

$app->get('/deleteUser/:id',function($id) use ($app){
    $params = array('admin_id' => $id);
    if($query = db()->delete('admin_info',$id)){
        echo json_encode(array('result'=>'success'));
    }else{
        echo json_encode(array('result'=>'error'));
    }
});


$app->post('/voteCandidates', function() use ($app){
    $params = json_decode(getPOSTParams(),true);
    $candidates = array(
        'voters_id' => $params['voters_id'],
        'president' => $params['president'],
        'vice_president' => $params['vice_president'],
        'secretary' => $params['secretary'],
        'treasurer' => $params['treasurer'],
        'pio' => $params['pio'],
        'auditor' => $params['auditor'],
        'fourth' => $params['fourth'],
        'third' => $params['third'],
        'second' => $params['second']
     );

    if($query = db()->create('vote_data',$candidates)){
        echo json_encode(array('result' => 'success'));
    }else{
        echo json_encode(array('result'=> 'error'));
    }

});

$app->get('/getAdminDetails/:id',function($id) use ($app){
    $params = array('admin_id' => $id);
    if($query = db()->select('admin_info','*',$params)){
        echo json_encode($query->fetch(false));
    }else{
        echo json_encode(array('message' => 'No user found!'));
    }
});

$app->get('/getAllParties', function() use ($app){
    $query = db()->select('party_list','*');
    if($query){
        echo json_encode(array('result' => 'success', 'parties' => $query->all()));
    }else{
        echo json_encode(array('result' => 'error','msg' => 'Unable to get all party list!'));
    }
});

$app->get('/getAllVotes',function(){
    $query = db()->select('vote_data','*');
    if($query){
        $result = array(
                'result' => 'success',
                'record' =>   $query->all() 
            );
        echo json_encode($result);
    }else{
        echo json_encode(array('result' => 'error','msg' => 'Unable to get all votes!'));
    }
});

$app->post('/insertUser',function() use ($app){
     $params = json_decode(getPOSTParams(),true);
     $data = array(
        'username' => $params['username'],
        'password' => SHA1($params['password']),
        'firstname' => $params['firstname'],
        'lastname' => $params['lastname'],
        'role' => $params['role']
        );
    $query = db()->create('admin_info',$data);
    if($query){
        echo json_encode(array('result'=>'success','id'=>$query->id()));
    }else{
        echo json_encode(array('result'=>'error'));
    }
});

$app->post('/getAllUser',function() use ($app){
    $query = db()->select('admin_info','*');
    if($query){
        echo json_encode($query->all());
    }else{
         echo json_encode(array('result' => 'error','msg' => 'Unable to get all users!'));   
    }
});

$app->post('/consolidateVotes',function() use ($app){
    $params = json_decode(getPOSTParams(),true);
    $data = array(
        $params['position'] => $params['name']
    );
    $query = db()->select('vote_data','*',$data);
    if($query){
        echo json_encode($query->count());
    }else{
         echo json_encode(array('result' => 'error','msg' => 'Unable to consolidate votes!'));   
    }
});

$app->post('/verification', function() use ($app){
    $params = json_decode(getPOSTParams(),true);
    $query = db()->select('config','*',array('passcode' => SHA1($params['passcode'])));
    if($query->count() > 0){
        echo json_encode(array('result' => 'success'));
    }else{
        echo json_encode(array('result' => 'error','msg' => 'Invalid Passcode'));
    }
});

$app->run();
