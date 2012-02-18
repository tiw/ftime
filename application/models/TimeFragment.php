<?php

class Application_Model_TimeFragment extends Tiddr_Model_Abstract
{
    protected $_tableName = 'Application_Model_DbTable_TimeFragment';

    private $_properties = array('id', 'project', 'start_time', 'end_time');

    public function __construct($id, $project, $startTime, $endTime)
    {
        $this->id = $id;
        $this->project = $project;
        $this->startTime = $startTime;
        $this->endTime = $endTime;
        $this->_table = new $this->_tableName();
    }
    public function save()
    {
        $data = array(
            'id' => $this->id,
            'project' => $this->project,
            'start_time' => $this->startTime,
            'end_time' => $this->endTime
        );
        if ($this->id) {
            $this->_table->update($data);
        } else {
            $this->_table->insert($data);
        }
    }

    //public function findAll()
    //{
        //return $this->_table->fetchAll();
    //}

}

